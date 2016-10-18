const express = require('express');
const app = express();

app.get('/hello', function (req, res) {
	res.send('{"message": "Hello, ' + req.query.name + '"}')
})

app.listen(3000, function() {
	console.log('Listening on port 3000!');
});

app.use(express.static('public'))