from flask import Flask, request, Response
import requests

app = Flask(__name__)

# Handle preflight requests
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, SOAPAction"
    return response

@app.route("/proxy", methods=["GET", "POST", "OPTIONS"])
def proxy():
    # Preflight (OPTIONS) should return empty with CORS headers
    if request.method == "OPTIONS":
        return Response(status=200)

    target_url = "https://api.cba.am/exchangerates.asmx"

    if request.method == "POST":
        resp = requests.post(target_url, data=request.data, headers={
            "Content-Type": "text/xml; charset=utf-8",
            "SOAPAction": "http://www.cba.am/ExchangeRatesLatest"
        })
    else:
        resp = requests.get(target_url, params=request.args)

    return Response(
        resp.content,
        status=resp.status_code,
        headers={
            "Content-Type": resp.headers.get("Content-Type", "text/plain"),
            "Access-Control-Allow-Origin": "*"
        }
    )

if __name__ == "__main__":
    app.run(port=5000, debug=True)
