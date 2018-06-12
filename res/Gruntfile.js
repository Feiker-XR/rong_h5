/*
* @Author: zhaoxiaoyang
* @Date:   2016-03-31 09:30:37
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-15 18:47:43
*/

var testConfig = require('./testConfig.js');
var onlineConfig = require('./onlineConfig.js');
var tpljs = require('./_tool/file.js');
var modeljs = require('./_tool/mergeModel.js');
var T = testConfig;
var O = onlineConfig;
var cleancss = true;
var deployModules = [];



//合并组件 到base
if (T.less) {
    cleancss = true
}
if(T.mergeModelJs){
    modeljs.createMergeModelsFiles(T.mergeModelJs);
}
if(O.less){
    if(/h5plus/g.test(onlineConfig.less.join('') )){
        cleancss = false;
    }
}
if(O.mergeModelJs){
    modeljs.createMergeModelsFiles(O.mergeModelJs);
}




module.exports = function(grunt) {
    // var transport = require('grunt-cmd-transport');
    // var style = transport.style.init(grunt);
    // var text = transport.text.init(grunt);
    // var script = transport.script.init(grunt);
    var getdir = function(filepath) {
        var sp = filepath.split('/');
        var filename = sp[sp.length - 1];
        return filepath.replace(filename, '');
    }

    //测试环境批处理
    var $test = {
         less: {
            test:{
                expand: true,
                src: ['./src/h5plus/css/'+ T.lessDir +'/*.less'],
                dest: './',
                ext: '.css',
                 options: {
                    compress:true
                    ,cleancss: cleancss
                     // paths: ["./src/h5plus/css/"]
                 }
            }
         },
        uglify: {
            js1: {
                options: {
                    // beautify: true,
                    compress: {
                        global_defs: {
                            "DEBUG": true
                        },
                        dead_code: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: T.base,
                    src: T.js,
                    dest: 'dest'
                }]
            }
        },
        copy: {
            copy: {
                files: [{
                    expand: true,
                    cwd: T.base,
                    src: T.copy,
                    dest: 'dest'
                }]
            }
        },
        imagemin: { // Task
            img1: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: T.base, // Src matches are relative to this path
                    src: T.img, // Actual patterns to match
                    dest: 'dest', // Destination path prefix
                    filter: function(filepath) {
                        console.log('filepath:',filepath)
                        if ('src/tem/' == getdir(filepath)) {
                            return false
                        } else {
                            return true
                        }
                        // console.log()
                        // return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
                    }
                }]
            }
        }
    };

    //正式环境批处理
    var $online = {
        pkg: grunt.file.readJSON("package.json"),
        /*less: { // Set up to detect files dynamically versus statically
            css1: {
                options: {
                    cleancss: false
                },
                expand: true, // set to true to enable options following options:
                cwd: O.base, // all sources relative to this path
                src: O.less, // source folder patterns to match, relative to cwd
                dest: "dest/", // destination folder path prefix
                ext: ".css", // replace any existing extension with this value in dest folder
                flatten: false // flatten folder structure to single level
            }
        },*/
        less: {
            expand: true,
            src: ['./src/h5plus/css/'+ onlineConfig.lessDir +'/*.less'],
            dest: './',
            ext: '.css',
             options: {
                compress:true
                // ,paths: ["./src/h5plus/css/fans/manage"]
                ,cleancss: cleancss
             },
             options: {
             }
             // ,files: {"./src/*.css": "./src/*.less"}
        },
        uglify: {
            js1: {
                options: {
                    // beautify: true,
                    compress: {
                        global_defs: {
                            "DEBUG": true
                        },
                        dead_code: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: O.base,
                    src: O.js,
                    dest: 'dest'
                }]
            }
        },
        copy: {
            copy: {
                files: [{
                    expand: true,
                    cwd: O.base,
                    src: O.copy,
                    dest: 'dest'
                }]
            }
        },
        imagemin: { // Task
            img1: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: O.base, // Src matches are relative to this path
                    src: O.img, // Actual patterns to match
                    dest: 'dest', // Destination path prefix
                    filter: function(filepath) {
                        console.log('filepath:',filepath)
                        if ('src/tem/' == getdir(filepath)) {
                            return false
                        } else {
                            return true
                        }
                        // return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
                    }
                }]
            }
        }
    }


    //合并js 与 html 到_jstpl临时文件夹
    if (O.jstpl) {
        var file = new tpljs({
            "input": "./src",
            "outer": "./_jstpl",
            "callback": function(cb) {
                cb();
                console.log("成功")
            }
        });

        file.exec();

        $online.uglify.jstpl = {
            files: [{
                expand: true,
                cwd: '_jstpl/',
                src: O.jstpl,
                dest: 'dest'
            }]
        }
    }

    //console.log(O.mergeModelJs)
    if(O.mergeModelJs){

        for(var k in O.mergeModelJs){
            var de = O.mergeModelJs[k].dest;

            if(de.substr(0,1)=='/'){
                de = de.substr(1);
            }

            //console.log(de)

            $online.uglify[k] = {
                options: {
                    // beautify: true,
                    compress: {
                        global_defs: {
                            "DEBUG": true
                        },
                        dead_code: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: O.mergeModelJs[k].tmproot ,
                    src: de,
                    dest: O.mergeModelJs[k].destroot 
                }]
            }
        //console.log("ywchen:",O.mergeModelJs[k].destroot,O.mergeModelJs[k].destroot)
        }
    }


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-imagemin'); npm
    // grunt.loadNpmTasks('grunt-contrib-uglify');


    // deployModules: ["less", "copy", "imagemin", "uglify"]
    if (T.lessDir) {
        deployModules.push('less')
    }

    if (O.img) {
        deployModules.push('imagemin')
    }
    if (O.js) {
        deployModules.push('uglify');
    }
    if (O.cp) {
        deployModules.push('copy');
    }
    // grunt.registerTask('default', ['clean', "uglify:seamodules"]);


    grunt.initConfig($test);
    // grunt.initConfig($online);
    grunt.registerTask('default', deployModules);

};
