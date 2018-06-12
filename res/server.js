var fs = require("fs");
var hosts = require('../config/host.js');
var cdnPort = hosts.cdnPort;
var resroot = hosts.res;
var cdnUrl = hosts.cdnUrl;
var localPath = hosts.localPath || '';
var express = require('express');
var modelName = '开发';
var expressLess = require('express-less');
var app = express();
var merge = require('./_tool/merge.js');
var onlineConfig = require('./onlineConfig.js');
var modeljs = require('./_tool/mergeModel.js');




//allow custom header and CORS 跨域与server端通信
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});

var less_path = __dirname + '/'
// console.log('less_path',less_path)
app.use('', expressLess(less_path + resroot, {
    compress: true,
    relativeUrls: true
}));


// fs.readFile(less_path + resroot, function(err,styles) {
//     if(err) {
//         console.error('Could not open file: %s',err);
//         return
//     }
//     expressLess.render(styles.toString(), function(er,css) {
//         if(er) return console.error(er);
//         fs.writeFile(less_path + 'styles.css', css, function(e) {
//             if(e) return console.error(e);
//             console.log('Compiled CSS');
//         });
//     });
// });

// var  lessMiddleware = require("less-middleware");
 
/*app.use(lessMiddleware({
    src: less_path + resroot,
    dest:less_path + resroot,
    prefix: "/*.css",
    force: false
}));*/
// app.use(express.static(less_path));
// console.log('less_path + resroot:',less_path + resroot);


var path = require('path');

app.get('/*.js', function(req, res, next) {
    var query = req.originalUrl;

    query = '/' + query.substring(1, query.length).split('?')[0];

    //// console.log('paths:'+query)

    if (resroot == 'src') {
        var content = null;
        if (/tpl_/g.test(query)) {
            var js = merge.readFile(resroot + '/' + query);
        } else if ((content = isMerge(query)) !== false) {
            var js = content;
        } else {
            // var js = fs.readFileSync(localPath + resroot + query, 'utf-8');
            var js = fs.readFileSync(__dirname + '/' + resroot + query, 'utf-8');
        }

    } else {
        var js = fs.readFileSync(resroot + query, 'utf-8');
    }



    res.type('text/javascript');
    res.send(js);

});


app.get('/*.html', function(req, res, next) {
    var query = req.originalUrl;
    query = '/' + query.substring(1, query.length).split('?')[0];

    // var js = fs.readFileSync(localPath + resroot + query, 'utf-8');
    // var htm = fs.readFileSync(resroot + query, 'utf-8') || fs.readFileSync(__dirname + resroot + query, 'utf-8');
    var htm = fs.readFileSync(__dirname + '/' + resroot + query, 'utf-8');

    res.send(htm);

});


app.use('/', express.static(path.join(__dirname, '/' + resroot)));
// respond
app.get('/svnup', function(req, res, next) {

    var svn = require("svn-interface");
    var option = {
        "username": "zhaoxiaoyang",
        "password": "zxy1221"
    }
    

    svn.update(__dirname, option, function up(e, r) {

        console.log(r)

        res.send('<div>' + __dirname + '----' + r + '</div>')
    })

});
    
app.get('/clean', function(req, res, next) {

    var svn = require("svn-interface");
    var option = {
        "username": "zhaoxiaoyang",
        "password": "zxy1221"
    }
    svn.cleanup(__dirname, {}, function up(e, r) {
         res.send('<div>cleanup suc!!</div>')
    })

});


app.listen(cdnPort, function (argument) {
    console.log('res/src cdnPort:'+(app.get('port')||cdnPort))
});

if (resroot == "dest") {
    modelName = "上线"
}


function isMerge(filePath) {
    var mergeModelJs = onlineConfig.mergeModelJs;
    var files = null;
    for (var key in mergeModelJs) {
        var item = mergeModelJs[key];
        var dest = item.dest;
        if (dest == filePath || dest == ("/" + filePath)) {
            files = item
        }
    }
    var rev = files != null ? modeljs.getModelContent(files, resroot) : false;
    return rev;
}
