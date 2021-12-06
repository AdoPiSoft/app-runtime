#!/usr/bin/env bash

export APPDIR=$(pwd)
export TMPDIR=$APPDIR/.tmp
export NODE_PATH=$APPDIR/release:$APPDIR/node_modules
export PATH=$APPDIR/node_modules/.bin:$PATH
export DISTRIBUTOR_CODE="xxx"

# clean up tmp dir
rm -rf $TMPDIR
mkdir -p $TMPDIR

gulp &&\
  node ./validate-translations.js && \
  node ./migrate.js && \
  node --trace-warnings ./index.js
