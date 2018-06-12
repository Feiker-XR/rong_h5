var onlineConfig = require('./onlineConfig.js');
var tpljs = require('./_tool/file.js');
var modeljs = require('./_tool/mergeModel.js');
var fs = require("fs");
var C = onlineConfig;

function mergeModelJs(){
    //modeljs.createMergeModelsFiles(C.mergeModelJs,C.base);
    modeljs.createMergeModelsFiles(C.mergeModelJs);
}

mergeModelJs();