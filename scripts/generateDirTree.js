"use strict";
exports.__esModule = true;
var fs = require("fs");
var path_1 = require("path");
var dataPath = '../assets/data.json';
function generateFileList(path) {
    var result = [];
    var fileList = fs.readdirSync(path);
    fileList.map(function (val) {
        var file = path_1.join(path, val);
        var stats = fs.statSync(file);
        if (stats.isDirectory()) {
            result.push({
                isDir: true,
                pathname: val,
                files: generateFileList(file)
            });
        }
        else if (stats.isFile()) {
            result.push({
                isDir: false,
                pathname: val
            });
        }
        return undefined;
    });
    return result;
}
var files = generateFileList(path_1.resolve(__dirname, '../repo'));
fs.writeFile(dataPath, JSON.stringify({ pathname: '/', files: files }), function (err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Complete!');
    }
});
