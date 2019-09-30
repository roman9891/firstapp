const http = require('http');
const util = require('util');
const port = 8080;

http.createServer(function (req, res) {
    if (req.url.includes('favicon')) return
    const paramArr = req.url.substr(2).split('&')
    req.params = paramArr.reduce((a, b) => {
        if (b.includes('=')) {
            const arr = b.split('=')
            a[arr[0]] = arr[1]
            return a
        }
    }, {})
    
    const consoleMessage = req.params.console ? `console param: ${req.params.console}` : `no console params provided`
    const browserMessage = req.params.browser ? `browser param: ${req.params.browser}` : `no browser params provided`
    console.log(consoleMessage)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(browserMessage);
}).listen(port);
console.log(`server is running on port ${port}`)