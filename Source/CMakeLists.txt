cmake_minimum_required (VERSION 2.8)
project (ctags-js)

get_filename_component(PROJECT_DIR ${CMAKE_CURRENT_LIST_DIR}/.. ABSOLUTE)

set(SRC_DIR "${PROJECT_DIR}/Source")
set(3RD_PARTY_DIR "${PROJECT_DIR}/3rdParty")
set(CTAGS_SRC_DIR "${3RD_PARTY_DIR}/ctags")

set(ctags_files

    ${CTAGS_SRC_DIR}/ant.c
    ${CTAGS_SRC_DIR}/asm.c
    ${CTAGS_SRC_DIR}/asp.c
    ${CTAGS_SRC_DIR}/awk.c
    ${CTAGS_SRC_DIR}/basic.c
    ${CTAGS_SRC_DIR}/beta.c
    ${CTAGS_SRC_DIR}/c.c
    ${CTAGS_SRC_DIR}/cobol.c
    ${CTAGS_SRC_DIR}/css.c
    ${CTAGS_SRC_DIR}/dosbatch.c
    ${CTAGS_SRC_DIR}/eiffel.c
    ${CTAGS_SRC_DIR}/erlang.c
    ${CTAGS_SRC_DIR}/falcon.c
    ${CTAGS_SRC_DIR}/flex.c
    ${CTAGS_SRC_DIR}/fortran.c
    ${CTAGS_SRC_DIR}/go.c
    ${CTAGS_SRC_DIR}/html.c
    ${CTAGS_SRC_DIR}/jscript.c
    ${CTAGS_SRC_DIR}/lisp.c
    ${CTAGS_SRC_DIR}/lua.c
    ${CTAGS_SRC_DIR}/make.c
    ${CTAGS_SRC_DIR}/objc.c
    ${CTAGS_SRC_DIR}/ocaml.c
    ${CTAGS_SRC_DIR}/pascal.c
    ${CTAGS_SRC_DIR}/perl.c
    ${CTAGS_SRC_DIR}/php.c
    ${CTAGS_SRC_DIR}/python.c
    ${CTAGS_SRC_DIR}/rexx.c
    ${CTAGS_SRC_DIR}/ruby.c
    ${CTAGS_SRC_DIR}/scheme.c
    ${CTAGS_SRC_DIR}/sh.c
    ${CTAGS_SRC_DIR}/slang.c
    ${CTAGS_SRC_DIR}/sml.c
    ${CTAGS_SRC_DIR}/sql.c
    ${CTAGS_SRC_DIR}/tcl.c
    ${CTAGS_SRC_DIR}/tex.c
    ${CTAGS_SRC_DIR}/verilog.c
    ${CTAGS_SRC_DIR}/vhdl.c
    ${CTAGS_SRC_DIR}/vim.c
    ${CTAGS_SRC_DIR}/yacc.c

    ${CTAGS_SRC_DIR}/parse.c
    ${CTAGS_SRC_DIR}/options.c
    ${CTAGS_SRC_DIR}/routines.c
    ${CTAGS_SRC_DIR}/lregex.c
    ${CTAGS_SRC_DIR}/strlist.c
    ${CTAGS_SRC_DIR}/vstring.c
    ${CTAGS_SRC_DIR}/keyword.c
    ${CTAGS_SRC_DIR}/get.c
    ${CTAGS_SRC_DIR}/read.c
 )

set(ctags_js_files
  ${ctags_files}

  ctags-js.c
  ctags-glue.js
)

include_directories("." "../3rdParty" "../3rdParty/ctags")
add_definitions(-DHAVE_CONFIG_H)

emscripten_add_js_library(${SRC_DIR}/ctags-glue.js)
emscripten_export_functions(parseURL)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} --pre-js \"${SRC_DIR}/pre.js\"")

add_executable(ctags.js ${ctags_js_files})
