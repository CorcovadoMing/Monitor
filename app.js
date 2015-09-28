os = require('os');
app = require('express.io')();
express = require('express');
app.http().io();

app.io.route('ready', function(req) {
    req.io.emit('talk', {
	hostname: os.hostname(),
        cpus: JSON.stringify(os.cpus()),
	freemem: JSON.stringify(os.freemem()),
	totalmem: JSON.stringify(os.totalmem())
    })
})

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html')
})

app.listen(7076)
