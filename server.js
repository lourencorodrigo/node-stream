var express = require("express");
var fs = require("fs");

var app = express();

app.post("/2", (req, res) => {
  const stream = fs.createWriteStream('test.csv');
  req.pipe(stream);

  req.on('end', function () {
    res.send('resposta do server 2');
  });

  req.on('error', function () {
    res.send('error');
  });
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
