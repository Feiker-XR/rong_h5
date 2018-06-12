;
/**
 * @example
     var file = new FileObj({
        "input":"./mod"
        ,"outer":"./_temp"
        ,"callback":function(cb){
            cb();
            console.log("callback")
        }
    });

    file.exec();
 */
(function(){
	
	var fs = require("fs");
	var merge = require("./merge.js");
    
	function File(opt){
		this.input = opt.input;
		this.outer = opt.outer;
		this.callback = opt.callback;
        this.files = [];
        
        this.mkdirs = [];
        this.mkfiles = [];
	}
	
	File.prototype = {
		exec:function(){
			var me = this;
			this._getFileList(this.input,function(files){
				me.forList(files);
			});
		}
		,forList:function(files){
			var me = this;
			var file = null;
			var fileContent = null;
			for(var i = 0; i < files.length; i++){
				file = files[i];
				if(!merge.canMerge(file)){
					continue;
				}
				fileContent = merge.readFile(file);
                this._create(file, fileContent);
			}
            me.callback && me.callback(function(){
                me.remove();
            });
		}
		,_getFileList:function(dir,callback,level){
            
            level = level || 0;
			var me = this;
            var hasDir = false;
            var dirList = fs.readdirSync(dir);
            dirList.forEach(function(item){
                if(fs.statSync(dir + '/' + item).isDirectory()){
                    hasDir = true;
                    me._getFileList(dir + '/' + item,callback,level + 1);
                }else{
                    me.files.push(dir + '/' + item);
                }
            });
            if(level == 0){
                callback(me.files);
            }
            /**
			fs.readdir(dir, function(err, files) {
				if(fs.statSync(path + '/' + item).isDirectory()){
                    walk(path + '/' + item);
                }else{
                    fileList.push(path + '/' + item);
                }
				me.callback.apply(me);
			},false);
            */
		}
		,_create:function(file, fileContent){
            var me = this;
			var input = this.input;
			var outer = this.outer;
            var path = file.replace(new RegExp("^" + input),"");
            var index = path.lastIndexOf("/");
            var dir = path.substr(0,index + 1);
            var fileName = path.substr(index + 1);
            //console.log(dir,":",fileName," = ", file,"---",outer + dir)
            
            var dirs = dir.split("\/");
            var path2 = "";
            
            for(var j = 0; j < dirs.length; j++){
                if(dirs[j] == "")continue;
                path2 += "/" + dirs[j];
                
                this.mkdirs.push(outer + path2);
                var dirPath = outer + path2;
                var cb = function(){
                    
                }
                if(!fs.existsSync(dirPath)){
                    fs.mkdirSync(dirPath,"0777");
                }
            }
            
            fs.writeFileSync(outer + path, fileContent);
            this.mkfiles.push({
                "path":outer + path
                ,"content":fileContent
            });
            
		}
		,remove:function(){
		}
        ,createFolder:function(root,dir){
            var dirs = dir.split("\/");
            var path2 = "";
            
            for(var j = 0; j < dirs.length; j++){
                if(dirs[j] == "")continue;
                path2 += "/" + dirs[j];
                
                var dirPath = root + path2;
                if(!fs.existsSync(dirPath)){
                    fs.mkdirSync(dirPath,"0777");
                }
            }
        }
	}
	
	module.exports = File;

})();