//curl commands succesfully used:
//curl -X POST localhost:3000/request -d "hi" -H 'Content-Type: application/json'
//curl localhost:3000/request
//curl --head localhost:3000/request
//curl -X DELETE localhost:3000/request
//curl -X PUT -d "bye" localhost:3000/request

/*
1. I was able to test all of the commands (GET, HEAD, PUT, POST, DELETE) using the above terminal commands
2. I would say that the most appropriate response for pages that aren't defined in an express route would 
just be the standard 404 Not Found or the 501 Not Implemented
-----------------------6.2------------------------
1. The form data being passed back looks like an extension to a URL. This is what I found using
chrome devtools: user_name=Mit&user_mail=Mitch%40gmail.com&user_message=hehe
2. The URL encoding changed the "@" symbol to %40
*/



var express = require('express')
var app = express()
var HttpStatus = require('http-status-codes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/request', function (req, res) {
	res.send('Recieved the GET request')
})

app.post('/request', function (req, res) {
	res.send("Recieved the POST request")
})

app.put('/request', function (req, res) {
	res.send('Recieved the PUT request')
})

app.delete('/request', function (req, res) {
	res.send('Received the DELETE request')
})

app.post('/post_request', function (req, res) {
	res.send('POST req:<br>Name: <code>' + req.body.user_name + '</code><br>Email: <code>'
	 + req.body.user_mail + '</code><br>Message: <code>' + req.body.user_message + '</code>')
})

app.listen(3000, function() {
	console.log('Example app listening on port 3000')
})

app.all('*', function (req, res) {
	res.status(HttpStatus.NOT_IMPLEMENTED).send({ error: HttpStatus.getStatusText(HttpStatus.NOT_IMPLEMENTED)})
})