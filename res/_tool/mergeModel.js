;
(function(){
	
	var fs = require("fs");
	var host = require("../../config/host.js");
    var defaultPath = "./dest/";
    
    /** 在Gruntfile中使用
     *
     *  @param {Object} mergeModelJs:onlineConfig.mergeModelJs
     *  @example
        createMergeModelsFiles(onlineConfig.mergeModelJs);
     *
     */
    function createMergeModelsFiles(mergeModelJs){
        for(var key in mergeModelJs){
            var item = mergeModelJs[key];
            var dest = item.dest;
            var content = getModelContent(item,host.res);
            var index = dest.lastIndexOf("/");
            var dir = dest.substr(0,index);
            createFolder(item.tmproot , dir);
            fs.writeFileSync(item.tmproot + dest, content ,{"encoding":"utf8"});
        }
    }
    
    function getModelContent(data,root){
        root = root || defaultPath;
        data = data || {};
        var depend = data.depend || [];
        var content = [];
        var src = data.src || [];
        var isMerge = data.isMerge;
        content.push(_getContent(root, depend));
        if(isMerge){
            content.push(_getContent(root, src));
        }
        return content.join("\n");
    }
    
    function createFolder(root,dir){
        var dirs = dir.split("\/");
        var path2 = "";
        
        for(var j = 0; j < dirs.length; j++){
            if(dirs[j] == "" || /\./.test(dirs[j]))continue;
            path2 += "/" + dirs[j];
            
            var dirPath = root + path2;
            if(!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath,"0777");
            }
        }
    }
	
    function _readSystemFile(file){
        var code = fs.readFileSync(file, 'utf-8');
        return code;
    }
    
    //mergeModel
    function _getContent(basePath, files){
        var content = [];
        if(files == null || files.length == 0){
            // 但也要生成文件
            return "";
        }
        for(var k = 0; k < files.length; k++){
            
            console.log(basePath + files[k]);
            content.push(_readSystemFile(basePath + files[k]));
        }
        return content.join("\n");
    };
	
	var model = {
        "createMergeModelsFiles":createMergeModelsFiles
        ,"getModelContent":getModelContent
    }
	module.exports = model;

})();