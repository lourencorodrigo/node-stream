var express = require("express");
var request = require("request");
var axios = require("axios");
var multer = require("multer");
var FormData = require("form-data");

var app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/1", upload.single('file'), (req, res) => {
  const formData = new FormData();
  formData.append('file', req.file.buffer, req.file.originalname);

  console.log(formData.getHeaders());

  axios({
    method: "post",
    url: "http://95637c96.ngrok.io/companies/778209/eligibles/upload",
    data: formData,
    headers: {
      // ...formData.getHeaders(),
      "Accept": "application/vnd.gympass.eligibleapi.v1+json",
      "Authorization": req.headers['authorization'],
      "X-Session": req.headers['x-session'],
      "Content-Type": req.headers['content-type']
    }
  }).then(response => {
    console.log("response", response)
    res.send("OK");
  }).catch((error) => {
    console.log("error", error)
    res.send('ERROR');
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
