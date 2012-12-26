#include <ctags/parse.h>
#include <ctags/options.h>
#include <ctags/read.h>
#include <ctags/entry.h>


extern void generateCTags();

// This functions must never be called. It's only purpose is to keep JS functions alive.
void stayinAlive() __attribute__((used))
{
	assert(FALSE);
	generateCTags();
}


extern void parse(const char * filename) __attribute__((used))
{
	initializeParsing();
	initOptions();
	parseFile(filename);
}

extern void addTotals (
	const unsigned int files, 
	const long unsigned int lines,
    const long unsigned int bytes)
{}

extern boolean isDestinationStdout (void)
{
	return TRUE;
}

extern boolean matchRegexInCString(const char * line, const langType language)
{
	static vString *fileLine = NULL;

	vString *result = NULL;
	int i = 0;
	int c;
	if (fileLine == NULL)
		fileLine = vStringNew ();
	vStringClear (fileLine);
	do
	{
		c = line[i++];
		if (c != EOF)
			vStringPut (fileLine, c);
		if (c == '\0'  ||  (c == EOF  &&  vStringLength (fileLine) > 0))
		{
			vStringTerminate (fileLine);
			if (vStringLength (fileLine) > 0)
				matchRegex (fileLine, language);
			result = fileLine;
			break;
		}
	} while (c != EOF);
	return result;
}


extern void makeTagEntry (const tagEntryInfo *const tag)
{
	printf("name %s\n", tag->name);
	// printf("lineNumber %i\n", tag->lineNumber);
	// printf("filePosition %i\n", tag->filePosition);
	// printf("language %s\n", tag->language);
	// printf("sourceFileName %s\n", tag->sourceFileName);
	// printf("kindName %s\n", tag->kindName);
	// printf("access %s\n", tag->extensionFields.access);
	// printf("fileScope %s\n", tag->extensionFields.fileScope);
}


extern void initTagEntry (tagEntryInfo *const e, const char *const name)
{
	// Assert (File.source.name != NULL);
	memset (e, 0, sizeof (tagEntryInfo));
	e->lineNumberEntry = (boolean) (Option.locate == EX_LINENUM);
	e->lineNumber      = getSourceLineNumber ();
	e->language        = getSourceLanguageName ();
	e->filePosition    = getInputFilePosition ();
	e->sourceFileName  = getSourceFileTagPath ();
	e->name            = name;
}
