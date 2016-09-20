var express = require('express');
var app = express();

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
});

app.use(express.static('public'));