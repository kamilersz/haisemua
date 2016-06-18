'use strict';

var html = require('raw!./view.map.html');
var VueGoogleMap = require('vue-google-maps');
var showDetail = require('./../messageDetail.js');

Vue.component('map', VueGoogleMap.Map);
Vue.component('marker', VueGoogleMap.Marker);
VueGoogleMap.load({
  'key': 'AIzaSyCWLg0EphBOANHAHvAjFc4zzANC40lWu2A',
});

module.exports = function(done) {
  done({
    template: html,
    data: {
      markers: [],
      center: {
        lat: -6.911199,
        lng: 107.6097161
      },
      zoom: 13
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
          for (var i = 0; i < jsonObject.length; i++) {
            thisVm.markers.push({
              id: jsonObject[i].id,
              animation: 2,
              clickable: true,
              draggable: false,
              icon: {
                url: jsonObject[i].sender.profile_picture,
              },
              position: {
                lat: jsonObject[i].latitude,
                lng: jsonObject[i].longitude
              }
            });
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log('uh, oh... the request failed...', errorThrown);
        });
      },
      clickMarker: function(marker) {
        showDetail(marker.id);
      },
    },
    ready: function() {
      this.getData();
    },
  });
};
