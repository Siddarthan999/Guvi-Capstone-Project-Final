var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Hello World!!" }');
});

app.get('/authors', function (req, res) {
    res.send('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }');
});

app.get('/greetings', function (req, res) {
    res.send('{ "response": "Welcome, all" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

let server;
let port = process.env.PORT || 3000;

function startServer(callback) {
    server = app.listen(port, () => {
        console.log('Server is running on port', port);
        if (callback) callback();  // Callback is used for testing
    });
}

function closeServer(callback) {
    if (server) {
        server.close(callback);
    } else {
        callback();
    }
}

function setPort(newPort) {
    port = newPort;
}

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = { app, startServer, closeServer, setPort };
