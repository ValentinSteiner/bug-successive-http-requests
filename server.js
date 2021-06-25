const express = require('express');
const app = express();

app.listen(7070);

app.get('/', function (req, res) {
    res.send("hello");
});
