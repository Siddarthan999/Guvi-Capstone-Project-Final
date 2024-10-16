const request = require('supertest');
const { app, startServer, closeServer, setPort } = require('./index.js');

describe('API Tests', function() {

    before(function(done) {
        // Set the server port for testing to avoid conflicts with production server
        setPort(3001);  // Use a test port, e.g., 3001
        startServer(done);
    });

    describe('GET /', function() {
        it('respond with hello world', function(done) {
            request(app).get('/').expect('{ "response": "Hello World!!" }', done);
        });
    });

    describe('GET /authors', function() {
        it('respond with authors', function(done) {
            request(app).get('/authors').expect('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }', done);
        });
    });

    describe('GET /greetings', function() {
        it('respond with greetings', function(done) {
            request(app).get('/greetings').expect('{ "response": "Welcome, all" }', done);
        });
    });

    describe('GET /test', function() {
        it('respond with test message', function(done) {
            request(app).get('/test').expect('{ "response": "Test, Route!" }', done);
        });
    });

    after(function(done) {
        closeServer(() => {
            done();
            process.exit(0);  // Ensure process exits cleanly after tests
        });
    });

    this.timeout(5000);
});
