#!/bin/bash

# Debug|Release|RelWithDebInfo|MinSizeRel
BUILD_TYPE="MinSizeRel";

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )"
EMSCRIPTEN_DIR="$BASE_DIR/3rdParty/emscripten"
GENERATED_DIR="$BASE_DIR/Generated"

# Set environment variables required by Emscripten
export EMSCRIPTEN_ROOT="$EMSCRIPTEN_DIR"

# Clear everything
rm -rf "$GENERATED_DIR"
mkdir -p "$GENERATED_DIR"

pushd "$GENERATED_DIR"
	cmake -DEMSCRIPTEN=1 \
		  -DCMAKE_TOOLCHAIN_FILE="$EMSCRIPTEN_DIR/cmake/Platform/Emscripten_unix.cmake" \
		  -DCMAKE_MODULE_PATH="$EMSCRIPTEN_DIR/cmake" \
		  -DCMAKE_BUILD_TYPE="$BUILD_TYPE" \
		  -G "Unix Makefiles" "$BASE_DIR/Source/"
	make VERBOSE=1
    cp ctags.js "$BASE_DIR"
popd
