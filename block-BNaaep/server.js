var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    if(req.method === 'GET' && req.url === '/') {
        req.setHeader('Content-Type', 'text/html');
        res.end()
    }
}

server.listen(5000, () => {
    console.log(`server is listening on port 5k`);
})