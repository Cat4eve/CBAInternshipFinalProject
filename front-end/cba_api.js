export async function getRate(currency = null) {
    const res = await fetch("http://localhost:5000/proxy", {
        method: "POST",
        headers: { "Content-Type": "text/xml; charset=utf-8" },
        body: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ExchangeRatesLatest xmlns="http://www.cba.am/" />
            </soap:Body>
        </soap:Envelope>`
    });

    const xmlString = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const rates = xmlDoc.getElementsByTagName("ExchangeRate");

    const results = [];

    for (let i = 0; i < rates.length; i++) {
        const isoCode = rates[i].getElementsByTagName("ISO")[0]?.textContent;
        const rateValue = rates[i].getElementsByTagName("Rate")[0]?.textContent;

        if (isoCode === currency) {
            return parseFloat(rateValue);
        }
        results.push({'code': isoCode, 'rate': rateValue});
    }

    return results;
}