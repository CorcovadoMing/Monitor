var os = require('os');
var app = require('express.io')();
var express = require('express');
var morgan = require('morgan');

var port = 7076;
app.http().io();

app.io.route('ready', function(req) {
    req.io.emit('talk', {
	hostname: os.hostname(),
        cpus: JSON.stringify(os.cpus()),
	freemem: JSON.stringify(os.freemem()),
	totalmem: JSON.stringify(os.totalmem())
    });
});

app.use(morgan('combined'));
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(port);
