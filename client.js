const myreq = require("./myreq.js");

let client;
let conn_counter = 0;
const URL = "http://localhost:7070";

function connect_inner() {
    myreq.get(URL, (response, rawBody) => {
        console.log("2nd HTTP request: " + response.statusCode);
    });
}

function connect() {
    myreq.get(URL, (response, rawBody) => {
        console.log("1st HTTP request: " + response.statusCode);

        if (response.statusCode === 200) {
            /* CHOOSE ONE OF THE FOLLOWING LINES */
            connect_inner(); // fails
            // setImmediate(connect_inner); // fails
            // setTimeout(connect_inner, 50); // this works
            // setTimeout(connect_inner, 0); // this works
        }
    })
}


(function main() {
    setInterval(() => {
        console.log("");
        console.log("CONNECT " + conn_counter);
        connect();
        conn_counter += 1;

    }, 1000);
})();
