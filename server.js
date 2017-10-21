var express = require("express");
var app     = express();
var dayTokenAbi = require('./dayTokenABI.json');
var dayTokenBytecode = require('./dayTokenBytecode.json');
var daytoken2ABI = require('./DayToken2ABI.json');
var daytoken2bytecode = require('./DayToken2Bytecode.json');
var deployerABI = require('./DeployNewTokenABI.json');
var deployerBytecode = require('./DeploynewTokenBytecode.json');

app.set('view engine', 'pug');


app.get('/', function (req, res) {
    res.render('index', {'dttokenABI':dayTokenAbi, 'dtbytecodeData':dayTokenBytecode.data,'deployerABI':deployerABI,'deployerBytecode':deployerBytecode});
  })

app.get('/watch/:address', function (req, res) {
    res.render('watchToken', {'tokenAddress':req.params.address, 'dt2tokenABI':daytoken2ABI, 'dt2bytecodeData':daytoken2bytecode.data});
  })  

app.listen(3000);
console.log("Running at Port 3000");