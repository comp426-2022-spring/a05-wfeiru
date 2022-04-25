
# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-VYm8Bk1/RW8RGhDXdTwBYk6lbGE"
Date: Mon, 25 Apr 2022 02:48:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flips/3
```

#### Response body

```
{"raw":["tails","tails","heads"],"summary":{"tails":2,"heads":1}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 65
ETag: W/"41-ncb2dhjy17EQk3n/k2EZdZL7FNE"
Date: Mon, 25 Apr 2022 02:50:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/coins
```

#### Response body

```
404 NOT FOUND
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 13
ETag: W/"d-9cDc1x9S0CgmdX/8mukTB8yQ/hY"
Date: Mon, 25 Apr 2022 03:04:40 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/call/heads
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Mon, 25 Apr 2022 03:01:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/access
```

#### Response body

```
[{"id":1,"remoteaddr":"::1","remoteuser":null,"time":"1650837352299.0","method":"POST","url":"/?number=5app/flip/coins/","protocol":"http","httpversion":1.1,"status":200,"referrer":"http://localhost:5555/?number=5","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"},{"id":2,"remoteaddr":"::1","remoteuser":null,"time":"1650837929440.0","method":"GET","url":"/app/flip/","protocol":"http","httpversion":1.1,"status":200,"referrer":"http://localhost:5555/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"},...]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 79175
ETag: W/"13547-11/8rHItvUuXspeFF78vFxXotrE"
Date: Mon, 25 Apr 2022 03:18:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/error/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/error/
```

#### Response body

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Error test successful.<br> &nbsp; &nbsp;at /Users/ruthwu/comp426/a05-wfeiru/index.js:79:15<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/index.js:281:22<br> &nbsp; &nbsp;at Function.process_params (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/index.js:341:12)<br> &nbsp; &nbsp;at next (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/index.js:275:10)<br> &nbsp; &nbsp;at /Users/ruthwu/comp426/a05-wfeiru/index.js:66:5<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/ruthwu/comp426/a05-wfeiru/node_modules/express/lib/router/layer.js:95:5)</pre>
</body>
</html>
```

#### Response headers

```
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1254
Date: Mon, 25 Apr 2022 03:22:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)

_Not yet implemented_

#### Request cURL

```
curl http://localhost:5000/app/log/error/
```

#### Response body

```

```

#### Response headers

```

```

### /app/user/login/ (POST)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/new/ (POST)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/update/ (PATCH)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/delete/ (DELETE)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```
