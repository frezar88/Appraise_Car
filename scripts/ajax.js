export class RequestData {
    constructor() {
    }
    async requestRun(url, method, body) {
        let domain = url,
            meth = method
        let response = await fetch(domain, {
            method: method,
            headers: {},
            body: JSON.stringify(body),
        })
        if (!response.ok) return console.error("Error");
        return response.json();
    }
}