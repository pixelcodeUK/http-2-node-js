var http2 = require('http2'),
    fs    = require('fs'),
    url   = require("url"),
    path  = require('path');

var options = {
  key: fs.readFileSync('/home/vagrant/key.pem'),
  cert: fs.readFileSync('/home/vagrant/cert.pem')
};

http2.createServer(options, function(request, response) {
  var uri = url.parse(request.url).pathname;
  switch(uri){
    case '/' :
      if(response.push) {
        console.log('push');
        var push = response.push('/alert.js');
        push.writeHead(200);
        fs.createReadStream(path.join(__dirname, './alert_push.js')).pipe(push);
      }
      response.end('<html><body>Hello world!<script src="/alert.js"></script></body></html>');
    break;
    case '/alert.js':
      response.end(fs.readFileSync(path.join(__dirname, './alert.js')));
    break;
  }
}).listen(3001);
