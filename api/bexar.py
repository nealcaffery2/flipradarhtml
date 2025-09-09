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
