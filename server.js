var express = require("express");
var fs = require("fs");

var app = express();

app.post("/2", (req, res) => {
  const stream = fs.createWriteStream("test.csv");
  req.pipe(stream);

  stream.on('finish', function () {
    console.log('stream do server 2');
    res.send('resposta do server 2');
  });
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
