var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

var contact = path.join(__dirname + "/contact.html");

var contactDir = path.join(__dirname, "./contacts/")
console.log(contactDir);

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

    console.log(`req.method:${req.method} & req.url:${req.url}`);

    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {

        if(req.method === 'GET' && req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('index.html').pipe(res);
        }

        if(req.method === 'GET' && req.url === '/about') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('about.html').pipe(res);
        }

        if(req.method === 'GET' && req.url.split(".").pop() === 'css') {
            res.setHeader('Content-Type', 'text/css');
            fs.createReadStream(__dirname + "/stylesheet/style.css").pipe(res);
        }

        var img = path.join(__dirname, "/assets")

        if(req.url.split(".").pop() === "png" || req.url.split(".").pop() === "jpg") {
            res.setHeader('Content-Type', `image.png`);
            fs.createReadStream(__dirname + req.url).pipe(res)
        }

        if(req.method === 'POST' && req.url === '/form') {
            let parsedData = qs.parse(store);
            let userName = parsedData.name;

            fs.open(contactDir + userName + '.json', 'w', (err, fd) => {
                console.log(err);
                fs.writeFile(fd, JSON.stringify(qs.parse(store)), 'utf-8', (err) => {
                    console.log(err);
                fs.close(fd, (err) => {
                    console.log(err);
                    res.end(`${userName} is successfully created`);
                });
                });
            })
        }


        if(req.method === 'GET' && req.url === '/contact') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('contact.html').pipe(res);
        }

    })

  
}


server.listen(5000, () => {
    console.log(`server is listening on port 5k`);
})