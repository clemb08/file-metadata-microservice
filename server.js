'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');

var app = express();

var storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, file)
  },
  filename: (req, file, done) =>{
    done(null, file.fieldname)
  }
});

var upload = multer({ storage : storage }).single('userPhoto');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", (req, res) => {
  upload(req, res, (err) => {
    console.log(res.originalname);
    if (err) {
      return res.send("Error uploading");
    }
    res.send({"filename": res.originalname, sizeFile: res.size});
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
