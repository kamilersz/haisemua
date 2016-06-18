module.exports = function(messageId) {

  var modal = new quasar.Modal({
    template: require('raw!./message_detail/view.message_detail.html'),
    data: {
      message: {
        sender: {
          name: ''
        }
      },
      replies: [],
    }
  });

  quasar.make.a.get.request({
    url: 'message/' + messageId,
    xhrFields: {
      withCredentials: false
    }
  })
  .done(function(jsonObject) {
    modal.vm.message = jsonObject.message;
    modal.vm.replies = jsonObject.replies;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('uh, oh... the request failed...', errorThrown);
  });
  modal.show();
};
