
var rootUrl = require('./host.js').rootUrl;
console.log(rootUrl);
module.exports = {
	seajq: rootUrl + '/comlibjs/lib/seajq.js',
	sea: rootUrl + '/comlibjs/lib/sea.js',
    jquery: rootUrl + '/comlibjs/lib/jquery.js',
    zepto: rootUrl + '/comlibjs/lib/zepto.js',
    lazyload: rootUrl + '/comlibjs/lib/3/lazyload.js',
    fp: rootUrl + '/comlibjs/lib/3/fp/f.js',
    fpcss: rootUrl + '/comlibjs/lib/3/fp/f.css'
    // ,rkh5 : rootUrl + '/rkh5/js/rkh5.js',
    // lecss3 : rootUrl + '/rkh5/css/css3.css'
};
