# api/bexar.py  (Vercel Python Serverless Function)
import os, json
from datetime import datetime
from urllib.parse import parse_qs

from bexar_publicsearch_scraper import run_scrape, rows_to_geojson  # import your functions

def validate_date(s:str):
    datetime.strptime(s, "%Y-%m-%d")
    return s

def parse_params(query_string:str):
    q = parse_qs(query_string or "")
    party      = (q.get("party") or [""])[0].strip()
    party_type = (q.get("party_type") or ["grantor"])[0].strip().lower()
    date_from  = validate_date((q.get("from") or ["2024-01-01"])[0])
    date_to    = validate_date((q.get("to") or [datetime.utcnow().date().isoformat()])[0])
    if party_type not in ("grantor","grantee"):
        party_type = "grantor"
    return party, party_type, date_from, date_to

def handler(request, response):
    try:
        party, party_type, date_from, date_to = parse_params(request.query_string)
        if not party:
            return response.status(400).json({"error":"party is required"})

        rows = run_scrape(date_from=date_from, date_to=date_to, party_type=party_type, party=party)
        gj = rows_to_geojson(rows)
        headers = {
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin":"*",
          "Cache-Control":"no-store"
        }
        return response.status(200).headers(headers).send(json.dumps(gj, ensure_ascii=False))
    except Exception as e:
        return response.status(500).json({"error": str(e)})
        # pip: supabase>=2.6.0  (add to your project if you want)
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")
sb: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

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
        })
    # upsert on doc_number
    sb.table("bexar_docs").upsert(payload, on_conflict="doc_number").execute()

