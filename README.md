This simple application produces a bug when run in an Electron renderer process on Ubuntu.
The problematic pattern is to make two successive HTTP requests immediately after another.
The second HTTP request is fired synchronously from the response callback of the first.


### Steps to reproduce
* Clone this repo and run `npm install`.
* Start the server using `node server.js`.
* Start the Electron app using `npm start` in a separate shell. Check the DevTools console output.
* Running `node client.js` (i.e. without Electron) does not show the error behavior.

### Correct behavior
```
CONNECT 0
1st HTTP request: 200
2nd HTTP request: 200

CONNECT 1
1st HTTP request: 200
2nd HTTP request: 200

CONNECT 2
1st HTTP request: 200
2nd HTTP request: 200

..
```


### Example error behavior
```
CONNECT 0
1st HTTP request: 200

CONNECT 1
2nd HTTP request: 200
1st HTTP request: 200
2nd HTTP request: 200

CONNECT 2
1st HTTP request: 200

CONNECT 3
2nd HTTP request: 200
1st HTTP request: 200

CONNECT 4
2nd HTTP request: 200
1st HTTP request: 200

..
```


### Notes
* It seems to be some sort of timing error, I've seen it work differently upon app startup as opposed to later.
* If the second connection is not established right away, it is pushed through on the next 1st HTTP request.
* I first noticed the issue when using the request library. To drill down, I switched to the native http module, the error remained.
* The issue may have to do with accessing a local HTTP server. Running against a server on the internet works most of the time.
* The issue only appears if we read the response body in myreq.js (by attaching a handler to the 'data' event).
* The bug is NOT reproducible on Windows 10, macOS 10.13.
* The bug is reproducible on Ubuntu 16.04, 20.04.
* Note again that running `node client.js` exhibits the correct behavior.
