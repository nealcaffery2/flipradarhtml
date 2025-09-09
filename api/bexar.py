# api/bexar.py – Vercel Python Serverless Function
import os, json
from datetime import datetime
from urllib.parse import parse_qs
from collections import defaultdict

from bexar_publicsearch_scraper import run_scrape, rows_to_geojson
from supabase import create_client, Client

# ---------- Supabase setup ----------
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")
sb: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

# ---------- Helpers ----------
def validate_date(s: str):
    datetime.strptime(s, "%Y-%m-%d")
    return s

def parse_params(query_string: str):
    q = parse_qs(query_string or "")
    party      = (q.get("party") or [""])[0].strip()
    party_type = (q.get("party_type") or ["grantor"])[0].strip().lower()
    date_from  = validate_date((q.get("from") or ["2024-01-01"])[0])
    date_to    = validate_date((q.get("to") or [datetime.utcnow().date().isoformat()])[0])
    if party_type not in ("grantor","grantee"):
        party_type = "grantor"
    format_out = (q.get("format") or ["geojson"])[0].strip().lower()
    return party, party_type, date_from, date_to, format_out

def save_rows_to_supabase(rows):
    if not sb or not rows: return
    payload = []
    for r in rows:
        payload.append({
          "doc_number": r.get("doc_number") or r.get("row_doc_number"),
          "recorded_date": r.get("recorded_date") or r.get("row_recorded_date"),
          "grantor": r.get("grantor") or r.get("row_grantor"),
          "grantee": r.get("grantee") or r.get("row_grantee"),
          "detail_url": r.get("detail_url"),
          "property_address": r.get("property_address"),
          "lng": r.get("lng"), "lat": r.get("lat"),
          "row_doc_type": r.get("row_doc_type"),
          "row_grantor": r.get("row_grantor"),
          "row_grantee": r.get("row_grantee"),
          "row_recorded_date": r.get("row_recorded_date"),
          "legal_description": r.get("legal_description"),
        })
    sb.table("bexar_docs").upsert(payload, on_conflict="doc_number").execute()

def group_rows(rows):
    """
    Group rows by (grantor, grantee), return with repeat counts + last date
    """
    groups = defaultdict(list)
    for r in rows:
        g = (r.get("row_grantor") or r.get("grantor"),
             r.get("row_grantee") or r.get("grantee"))
        groups[g].append(r)

    out = []
    for (grantor, grantee), docs in groups.items():
        dates = [d.get("row_recorded_date") or d.get("recorded_date")
                 for d in docs if d.get("row_recorded_date") or d.get("recorded_date")]
        last_date = max(dates) if dates else None
        out.append({
            "grantor": grantor,
            "grantee": grantee,
            "deal_count": len(docs),
            "last_date": last_date,
            "docs": docs
        })
    return out

# ---------- Vercel handler ----------
def handler(request, response):
    headers = {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Cache-Control":"no-store"
    }

    try:
        party, party_type, date_from, date_to, format_out = parse_params(request.query_string)
        if not party:
            return response.status(400).headers(headers).send(json.dumps({"error":"party is required"}))

        rows = run_scrape(date_from=date_from, date_to=date_to, party_type=party_type, party=party)
        save_rows_to_supabase(rows)

        if format_out == "grouped":
            data = group_rows(rows)
        else:
            data = rows_to_geojson(rows)

        return response.status(200).headers(headers).send(json.dumps(data, ensure_ascii=False))

    except Exception as e:
        return response.status(500).headers(headers).send(json.dumps({"error": str(e)}))
