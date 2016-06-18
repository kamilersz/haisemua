
var html = require('raw!./layout.master.html');

quasar.config.requests.baseURL = 'http://dev.kamil.web.id/haisemua/index.php';

module.exports = {
  template: html
};
