var CTagsJSGlue = {

    $ctagsJS: {
        position: 0,
        line: 0,
        content: null,
        fileName: null,
        languageID: -1,
        regex: {}
    },

    generateCTags : function(url)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4) {
                
                ctagsJS.position = 0;
                ctagsJS.content = xmlhttp.responseText;

                var urlPtr = allocate(intArrayFromString(url), 'i8', ALLOC_STACK)
                Module['_parse'](urlPtr);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    },

    regcomp : function(preg, patternPtr, cflags) {
        var flags = '';
        if (cflags & 2) flags += 'i';

        // Read the pattern. We can't use `Pointer_stringify` because we might match ASCII characters greater 127
        var pattern = '';
        var i = 0;
        var charCode;
        while (charCode = {{{ makeGetValue('patternPtr', 'i', 'i8', 0, 1) }}}) {
            pattern += String.fromCharCode(charCode);
            i++;
        }
        ctagsJS.regex[preg] = new RegExp(pattern, flags);
        
        return 0;
    },
    
    regexec : function(preg, stringPtr, nmatch, pmatch, eflags) {

        var string = Pointer_stringify(stringPtr);
        var regex = ctagsJS.regex[preg];

        var results = regex.exec(string);

        for (var i = 0; i < nmatch; i++) {

            var rm_so = -1;
            var rm_eo = -1;
            
            if (results && i < results.length) {
                rm_so = string.indexOf(results[i]);
                rm_eo = rm_so + results[i].length;
            }

            {{{ makeSetValue('pmatch', '8*i', 'rm_so', 'i32') }}};
            {{{ makeSetValue('pmatch', '8*i+4', 'rm_eo', 'i32') }}};
        };

        return (results ? 0 : 1); //REG_NOMATCH
    },

    openTagFile : function() {
        console.log('openTagFile');
    },

    closeTagFile : function(resize) {
        console.log('closeTagFile');
    },

    fileOpen : function(fileNamePtr, language) {
       // var fileName = Pointer_stringify(fileNamePtr);

        ctagsJS.languageID = Module['_getFileLanguage'](fileNamePtr);

        //console.log('fileOpen: ' + fileName + ' ' + lang);
        return true;
    },

    fileClose : function() {
        console.log('fileClose');
    },

    setContent : function(content) {
        ctagsJS.content = content;
        ctagsJS.position = 0;
    },

    fileReadLine : function() {        
        var lines = ctagsJS.content.split('\n');
        if (ctagsJS.line < lines.length) {
            var line = lines[ctagsJS.line];
            ctagsJS.line++;

              //  getFileLanguage
            // TODO: free!
            var linePtr = allocate(intArrayFromString(line), 'i8', ALLOC_NORMAL);
            Module['_matchRegexInCString'](linePtr, ctagsJS.languageID);
            return linePtr;

        } else {
            return 0;
        }
    },

    fileGetc: function() {
        var c;
        if (ctagsJS.position < ctagsJS.content.length) {
            c = ctagsJS.content.charCodeAt(ctagsJS.position);
            ctagsJS.position++;
        } else {
            c = -1; //EOF
        }
        return c;  
    },

    fileUngetc: function(c) {
        ctagsJS.position--;
        assert(ctagsJS.position >= 0);
        assert(c == ctagsJS.content.charCodeAt(ctagsJS.position));
    }

};

autoAddDeps(CTagsJSGlue, '$ctagsJS');
mergeInto(LibraryManager.library, CTagsJSGlue);
