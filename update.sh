#!/usr/bin/env bash

APPDIR=/opt/adopisoft
DEB_FILE=$APPDIR/update.deb
TYPE=""
MESSAGE=""

if [[ -f $DEB_FILE ]]
then
  cp -f $APPDIR/config/nginx/nginx-updating.conf /etc/nginx/nginx.conf
  systemctl restart nginx

  dpkg -i $DEB_FILE
  if [ $? -eq 0 ]; then
    TYPE="info"
    MESSAGE="Software updated successfully."
  else
    TYPE="error"
    MESSAGE="Software update failed."
  fi
  rm $DEB_FILE
  systemctl daemon-reload
  echo "$TYPE [[ $MESSAGE ]] $(date '+%Y-%m-%d %I:%M %p')" >> $APPDIR/adopisoft.log
fi

exit 0
