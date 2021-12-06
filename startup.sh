#!/usr/bin/env bash

export NODE_ENV=production
export APPDIR=$(pwd)
export TMPDIR=$APPDIR/tmp
export NODE_MODULES_DIR=$APPDIR/node_modules
export NODE_PATH=$APPDIR/application:$NODE_PATH
export PATH=$PATH:$APPDIR:$NODE_MODULES_DIR/.bin

# cleanup zip files in uploads dir
rm -rf $APPDIR/uploads/*.zip

cp -f $APPDIR/config/nginx/nginx-starting.conf /etc/nginx/nginx.conf
rfkill unblock 0 || true
systemctl restart nginx
rm -rf $TMPDIR
mkdir -p $TMPDIR
node $APPDIR/migrate.js
node $APPDIR/index.js


