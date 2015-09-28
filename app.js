os = require('os');
app = require('express.io')();
express = require('express');
app.http().io();

// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
    console.log('Got called');
    req.io.emit('talk', {
	hostname: os.hostname(),
        cpus: JSON.stringify(os.cpus()),
	freemem: JSON.stringify(os.freemem()),
	totalmem: JSON.stringify(os.totalmem())
    })
})

app.use(express.static(__dirname));

// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html')
})

app.listen(7076)
