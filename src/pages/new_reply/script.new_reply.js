'use strict';

var html = require('raw!./view.new_reply.html');

module.exports = function(done) {
  done({
    template: html,
    data: {
      title: '',
      content: '',
      messageId: 0,
    },
    methods: {
      save: function() {
        var thisVm = this;

        quasar.make.a.post.request({
          url: 'message/' + thisVm.messageId + '/reply',
          data: 'title=' + thisVm.title + '&content=' + thisVm.content,
          xhrFields: {
            withCredentials: false
          }
        })
        .done(function(jsonObject) {
          thisVm.title = '';
          thisVm.content = '';
          quasar.dialog({
            title: 'Info',
            message: 'Penambahan pesan sukses'
          });
          quasar.navigate.to.route('#/');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log('uh, oh... the request failed...', errorThrown);
        });
      },
    },
  });
};
