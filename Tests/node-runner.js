var fs = require('fs');
var ctags = require("../ctags.js");


function parseFile(filenameWithPath) {
	var content = fs.readFileSync(filenameWithPath);

	var lastSlashPos = filenameWithPath.lastIndexOf("/");
	var path = filenameWithPath.substr(0, lastSlashPos);
	var filename = filenameWithPath.substr(lastSlashPos + 1, filenameWithPath.length - lastSlashPos - 1);

    ctags.Module["FS_createPath"]("/", path, true, true);
 	ctags.Module["FS_createDataFile"]('/' + path, filename, content, true, false);
	ctags.Module['CTags_parseFile']('/' + filenameWithPath);
}


function onTagEntry(name, kind, lineNumber, sourceFile, language) {
	console.log(name + ' ' + kind + ' ' + lineNumber + ' ' + sourceFile + ' ' + language);
}


function onParseFileComplete(sourceFile) {
	console.log('Done: ' + sourceFile);
}


var lang = ctags.Module['CTags_getLanguage']('3rdParty/emscripten/tools/shared.py');
console.log('Language detected: ' + lang);

ctags.Module['CTags_setOnTagEntry'](onTagEntry);
ctags.Module['CTags_setOnParsingCompleted'](onParseFileComplete);

parseFile('3rdParty/emscripten/tools/shared.py');