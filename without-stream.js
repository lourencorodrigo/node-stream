var express = require("express");
var request = require("request");
var axios = require("axios");
var multer = require("multer");
var FormData = require("form-data");

var app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/1", upload.single("file"), (req, res) => {
  const formData = new FormData();
  formData.append('file', req.file.buffer);

  console.log(formData.getHeaders());

  axios({
    method: "post",
    url: "http://localhost:3001/2",
    data: formData,
    headers: formData.getHeaders()
  }).then(response => {
    res.send(response);
  }).catch(() => {
    res.send('ERROR');
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
