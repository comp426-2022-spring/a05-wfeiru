// Place your server entry point code here
const coin = require('./src/utils/coin.js');
const logdb = require('./src/services/database.js')
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// require minimist module
const args = require('minimist')(process.argv.slice(2));

// see what is stored in the object produced by minimist
// console.log(args)

// store help text 
const help = (`
    server.js [options]
    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.
    --debug	If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                false.
    --log		If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
    --help	Return this message and exit.
`);

// if --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// start an app server
const app = express();
const port = args.port || process.env.PORT || 5555;
const debug = args.debug || false
const log = args.log || true

// serve static HTML files
app.use(express.static('./public'));
// make Express use its own built-in body parser to handle JSON
app.use(express.json());

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port));
});

// middleware to insert a new record in database
app.use( (req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referrer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    console.log(logdata);
    const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referrer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referrer, logdata.useragent);
    next();
})

// available only if --debug=true
if (debug) {
    // endpoint /app/log/access
    app.get('/app/log/access', (req, res) => {
        const stmt = logdb.prepare('SELECT * FROM accesslog').all()
        res.json(stmt)
    });

    // endpoint /app/error
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.')
    });
}

// create an access log file
if (!log) {
    // use morgan for logging to files
    // create a write stream to append (flags: 'a') to a file
    const accessLog = fs.createWriteStream('./data/log/access.log', { flags: 'a' })
    // set up the access logging middleware
    app.use(morgan('combined', { stream: accessLog }))
}

// endpoint /app/flip/
app.get('/app/flip/', (req, res) => {
    const flip = {"flip": coin.coinFlip()};
    res.json(flip);
});

// endpoint /app/flips/:number
app.get('/app/flips/:number', (req, res) => {
    let flips = coin.coinFlips(req.params.number);
    let count = coin.countFlips(flips);
    res.json({"raw": flips, "summary": count});
});

app.post('/app/flip/coins/', (req, res, next) => {
    const flips = coin.coinFlips(req.body.number)
    const count = coin.countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
})

// endpoint /app/flip/call/:guess(heads|tails)/
app.get('/app/flip/call/:guess(heads|tails)/', (req, res) => {
    const game = coin.flipACoin(req.params.guess)
    res.status(200).json(game)
})

app.post('/app/flip/call/', (req, res, next) => {
    const game = coin.flipACoin(req.body.guess)
    res.status(200).json(game)
})

// check endpoint
app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage);
});

// default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND');
});