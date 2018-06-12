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

router.use(function(req, res, next) {
    var query = req.originalUrl;
    var qlen = query.length || 1;
    query = query.replace(/\?method=/img,'')
    
    var testJson = function(){
        // console.log("(req.query.t || 'POST' == req.method):" + (req.query.t || 'POST' == req.method))
        if (/login|Authorization/g.test(query)) {
            return 1
        }
        return +(req.query.t || 'POST' == req.method)
    };
    query = query.substring(1, qlen).split('?')[0];
    if (query == '') {
        query = 'index'
    }
    if (query == 'login') {
        query = 'login'
    }

    if (query == 'favicon.ico') {
        return
    }

    //假数据  t时间来区分ajax请求
    var routerQ;
    if (testJson()) {
        query = '../json' + req._parsedUrl.pathname;
        if(!/showtree/img.test(req._parsedUrl.pathname) && req._parsedUrl.query){
            var suffix = /method/i.test(req._parsedUrl.query)?req._parsedUrl.query.replace(/method=/,'').split('&')[0]:'';
            routerQ = query + suffix + '.js';
        }else{
            routerQ = query + '.js';
        }
    } else {
        routerQ = query.split('.html')[0] + '.html';
    }
    var split2 = query.split('/')[2] && query.split('/')[2].replace('.html','') || '';

    //// console.log('routerQ-last:', routerQ)

    try {
console.log('servUrl::'+ servUrl)
        res.render(routerQ, {
            data: {
                servUrl: servUrl,
                res: cdnUrl,
                css: cdnUrl + '/h5plus/css',
                img: cdnUrl + '/h5plus/img',
                js: cdnUrl + '/h5plus/js',
                rkui: cdnUrl + '/rkui/1.0.1/css',
                comlibjs: cdnUrl + '/comlibjs',
                v3: cdnUrl + '/comlibjs/v3',
                v: '?v=20151221',
                cat1: query.split('/')[0],
                cat2: query.split('/')[1],
                cat3: split2,
                cat4: query.split('/')[3],
                query: req.query,
                post : req.body
            }
        }, function(err, html) {
            //console.log('err:'+err)
            if (testJson()) {
                function sleep(milliSeconds) {
                    var startTime = new Date().getTime();
                    while (new Date().getTime() < startTime + milliSeconds);
                    res.send(ejs.render(html));
                };
                sleep(sleeptimg);
            } else {
                // console.log('OUTPUT_HTML:'+html)
                res.send(ejs.render(html));
            }
        });
    } catch (e) {
        routerQ = '../json/json.js';
        if (testJson()) {
            res.render(routerQ, {
                data: {
                    res: cdnUrl + '',
                    css: cdnUrl + '/h5plus/css',
                    img: cdnUrl + '/h5plus/img',
                    js: cdnUrl + '/h5plus/js',
                    rkui: cdnUrl + '/rkui/1.0.1/css',
                    comlibjs: cdnUrl + '/comlibjs',
                    v3: cdnUrl + '/comlibjs/v3',
                    v: '?v=20151221',
                    cat1: query.split('/')[0],
                    cat2: query.split('/')[1],
                    cat3: split2,
                    query: req.query,
                    post : req.body
                }
            }, function(err, html) {
                if (testJson()) {
                    function sleep(milliSeconds) {
                        var startTime = new Date().getTime();
                        while (new Date().getTime() < startTime + milliSeconds);
                        res.send(ejs.render(html));
                    };
                    console.log('sleeptimg:',sleeptimg)
                    sleep(sleeptimg);
                } else {
                    res.send(ejs.render(html));
                }
            });
        }
    }

    //next();
});

app.get('*.js', function(req, res, next) {
    var query = req.originalUrl;
    query = 'view/' + query.substring(1, query.length).split('?')[0];
    // console.log(query)

     var js = fs.readFileSync( query, 'utf-8');

    res.type('text/javascript');
    res.send(js);

});

app.get('*.css', function(req, res, next) {
    var query = req.originalUrl;
    query = 'view/' + query.substring(1, query.length).split('?')[0];
    console.log('get.css:',query)

     var css = fs.readFileSync( query, 'utf-8');
     console.log('Css:',css)
    res.type('text/css');
    res.send(css);

});
app.use('/', router);

// app.render('activity/list.html',{data : {a:1}}, function(err, html) {
//   console.log(html)
// });
app.listen(servPort, function (argument) {
    console.log( 'Web server servPort: ', servPort )
});
