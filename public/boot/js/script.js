'use strict';

var $st = $('#status-text');
var $p = $('#percent');
var $progress = $('#progress');

setInterval(function () {
  $.ajax({
    method: 'GET',
    url: '/boot/status',
    dataType: 'json',
    success: function (data) {
      $progress.animate({width: data.percent+'%'});
      $p.text('('+data.percent+'%)');
      $st.text(data.status);
      if (data.percent === 100 || !data.installed) window.location.reload();
    }
  });
}, 1000);
