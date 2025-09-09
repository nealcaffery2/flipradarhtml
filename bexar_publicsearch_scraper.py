def run_scrape(date_from, date_to, party_type=None, party=None):
    # ... do the exact work you already do, return out_rows (list of dict)
    return out_rows

def rows_to_geojson(rows):
    return {"type":"FeatureCollection","features":[
      {"type":"Feature",
       "geometry": {"type":"Point","coordinates":[r.get("lng"), r.get("lat")]} if r.get("lng") and r.get("lat") else None,
       "properties": {k:v for k,v in r.items() if k not in ("lng","lat")}
      } for r in rows
    ]}
