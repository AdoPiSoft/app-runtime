'use strict';

setInterval(function () {
  $.ajax({
    method: 'GET',
    url: '/boot/status',
    dataType: 'json',
    success: function (data) {
      window.location.reload();
    }
  });
}, 1000);
