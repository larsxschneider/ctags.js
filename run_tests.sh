#!/bin/bash

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )"

pushd "$BASE_DIR"
  	node Tests/node-runner.js
popd

