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


function onTagEntry(name, kind, lineNumber, sourceFile) {
	console.log(name);
}


ctags.Module['CTags_setOnTagEntry'](onTagEntry);
parseFile('3rdParty/emscripten/tools/shared.py');