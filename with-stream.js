var express = require("express");
var request = require("request");
var axios = require("axios");
var FormData = require("form-data");
var app = express();

// app.use(function (req, res, next) {
//   console.log('Passei pelo midleware.');
//   next();
// });

app.post("/1", (req, res) => {
  // const stream = request.post("http://localhost:3001/2");
  // const writer = process.stdout;
  // req.pipe(writer);

  // req.on('end', () => {
  //   res.send('OK');
  // });
  let uploadProgress = 0;

  const formData = new FormData();
  formData.append('file', req);

  req.on("data", function (chunk) {
    uploadProgress += chunk.length
    console.log(new Date(), uploadProgress);
  });

  axios({
    method: 'post',
    url: 'http://f4ccf89e.ngrok.io/companies/778209/eligibles/upload',
    data: formData,
    headers: {
      "Authorization": req.headers['authorization'],
      "X-Session": req.headers['x-session'],
      "Content-Type": req.headers['content-type']
    }
  }).then((response) => {
    res.send(response.data);
  }).catch(() => {
    res.send("ERROR")
  });

  // stream.on('response', function (response) {
  //   response.on('data', function(data) {
  //     res.send(data);
  //   });
  // });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
