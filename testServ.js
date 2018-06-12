var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');
var fs = require("fs");
var con = require('../config/host.js');
var servPort = con.servPort;
var servUrl = con.servUrl;
var cdnUrl = con.cdnUrl;
var bodyParser = require('body-parser');


//modify header and CORS 跨域与静态资源通信
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('views', __dirname + '/view/'); //设置模版目录
app.engine('.html', require('ejs').__express);
app.engine('.js', require('ejs').__express);
app.use('/view/', express.static(path.join(__dirname, '/view/')));
app.set('view engine', 'html');
var router = express.Router();
var sleeptimg = 500;

app.get('/svnup', function(req, res, next) {

    var svn = require("svn-interface");
    var option = {
        "username": "zhaoxiaoyang",
        "password": "zxy1221"
    }
    svn.update(__dirname, option, function up(e, r) {

        res.send(__dirname + '----' + r + '</br>')
    })
    return
});

