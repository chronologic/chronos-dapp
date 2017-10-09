var express = require("express");
var app     = express();
var tokenABI = require('./tokenABI.json');
var bytecode = require('./bytecode.json');

app.set('view engine', 'pug');


app.get('/', function (req, res) {
    res.render('index', {'tokenABI':tokenABI, 'bytecode_data':bytecode.data});
  })

app.listen(3000);
console.log("Running at Port 3000");