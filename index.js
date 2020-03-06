var express = require("express");
var request = require("request");
var axios = require("axios");

var app = express();

app.post("/1", (req, res) => {
  const stream = request.post("http://localhost:3001/2");
  req.pipe(stream);

  stream.on('response', function (response) {
    response.on('data', function(data) {
      res.send(data);
    });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
