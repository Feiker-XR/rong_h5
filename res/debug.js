/* 
* @Author: zhaoxiaoyang
* @Date:   2016-01-05 17:53:53
* @Last Modified by:   zhaoxiaoyang
* @Last Modified time: 2016-01-06 18:33:41
*/
var hosts = require('../config/host.js');
var localPath = hosts.localPath || '';


 // node-inspector
 // --debug F:\project\architect\h5plus-solution\res\server.js
 // --debug-brk=8002 F:\project\architect\h5plus-solution\res\server.js
var cp = require('child_process');
cp.spawn('/usr/local/bin/node', [ '--debug-brk=8002','./sub.js']);
