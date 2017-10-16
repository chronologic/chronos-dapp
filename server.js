var express = require("express");
var app     = express();
var tokenABI = require('./tokenABI.json');
var bytecode = require('./bytecode.json');
var daytokenABI = require('./dayTokenABI.json');
var daytokenbytecode = require('./dayTokenBytecode.json');

app.set('view engine', 'pug');


app.get('/', function (req, res) {
    res.render('index', {'tokenABI':tokenABI, 'bytecode_data':bytecode.data});
  })

app.get('/watch/:address', function (req, res) {
    res.render('watchToken', {'tokenAddress':req.params.address,'tokenABI':daytokenABI, 'bytecode_data':daytokenbytecode.data});
  })  

app.listen(3000);
console.log("Running at Port 3000");