'use strict';

var html = require('raw!./view.index.html');
var showDetail = require('./../messageDetail.js');

module.exports = function(done) {
  done({
    template: html,
    data: {
      items: [],
    },
    methods: {
      getData: function() {
        var thisVm = this;

        quasar.make.a.get.request({
          url: 'messages',
          cachable: false,
          xhrFields: {
            withCredentials: false
          }
        })
        .done(function(jsonObject) {
          thisVm.items = jsonObject;
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log('uh, oh... the request failed...', errorThrown);
        });
      },
      showDetail: function(messageId) {
        showDetail(messageId);
      },
    },
    ready: function() {
      this.getData();
    },
  });
};
