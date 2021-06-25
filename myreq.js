const http = require("http");

module.exports = {
    get: function(url, callback) {

        const req = http.request(url, response => {
            let rawData = "";
            response.setEncoding("utf8");
            response.on("data", chunk => { rawData += chunk; });
            response.on("end", () => {
                callback(response, rawData);
            });
        });

        req.on("error", error => {
            console.error(error)
        });

        req.end();
    }
}
