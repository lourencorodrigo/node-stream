var express = require("express");
var request = require("request");
var app = express();

// app.use(function (req, res, next) {
//   console.log('Passei pelo midleware.');
//   next();
// });

app.post("/1", (req, res) => {
  const stream = request.post("http://localhost:3001/2");
  req.pipe(stream);
  
  req.on('unpipe', data => {
    console.log('WriteStream: Piped on Stream...\n', data);
  });

  stream.on('response', function (response) {
    response.on('data', function(data) {
      res.send(data);
    });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
