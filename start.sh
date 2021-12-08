#!/usr/bin/env bash

export APPDIR=$PWD
export TMPDIR=$APPDIR/.tmp
export NODE_PATH=$APPDIR/release:$APPDIR/node_modules
export PATH=$APPDIR/node_modules/.bin:$PATH
export DISTRIBUTOR_CODE="xxx"

# clean up tmp dir
rm -rf $APPDIR/uploads/*.zip
rm -rf $TMPDIR
mkdir -p $TMPDIR

SRC_APP="$APPDIR/src/app"
SRC_CORE="$APPDIR/src/core"
SRC_REPAIR="$APPDIR/src/repair-upgrade"

if [ -d "$SRC_APP" ] ;then
  gulp esApp
fi
if [ -d "$SRC_CORE" ] ;then
  gulp esCore
fi
if [ -d "$SRC_REPAIR" ] ;then
  gulp esRepairUpgrade
fi

node ./validate-translations.js && \
  node ./migrate.js && \
  node --trace-warnings ./index.js
