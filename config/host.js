var os = require('os');
var IPv4Name = os.hostname();
var networkInterfaces = os.networkInterfaces();
var servPort = 1221;
var randPort = ~~(2000+Math.random()*8000);
var cdnPort = IPv4Name=='shaozhenxingdeMacBook-Pro.local'?
            2223
            :1000;
var IpV4Addr;


/*
 if (os.networkInterfaces().en0) {
	for(var i=0;i<os.networkInterfaces().en0.length;i++){
	    if(os.networkInterfaces().en0[i].family=='IPv4'){
	        IPv4=os.networkInterfaces().en0[i].address;
	    }
	}
};
var test = require('dns').lookup(IPv4Name, function (err, add, fam) {
  	IpV4Addr = add
	console.log('local IP: '+IpV4Addr);
	console.log('local Name: '+IPv4Name);
});
*/

for (var i in networkInterfaces){
    for (var m = 0, link = networkInterfaces[i], l = link.length; m < l; m++){

        // console.log(link[m]);
        if (link[m].family == 'IPv4' && link[m].address != '127.0.0.1') {
            IpV4Addr = link[m].address;
            break;
        }
    }
    if (IpV4Addr)
        break;
}

// IpV4Addr = 'localhost'
console.log('Web server IP: '+IpV4Addr);
console.log('Web server Name: '+IPv4Name);

/**
 * [host exports]
 * @description     [host输出接口]
 * @type  {Object}
 * @param {String}  [localPath] [(X:/盘符) + localPath + src]
 */
module.exports = {
    servPort: servPort,
    cdnPort: cdnPort,
    servUrl: 'http://'+IpV4Addr+':'+ servPort,
    cdnUrl: 'http://'+IpV4Addr+':'+ cdnPort,
    localPath: 'project\\architect\\h5plus-solution\\res\\',
    shell : 'view',
    res : 'src'
};
