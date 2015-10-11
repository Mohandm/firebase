(function () {
    'use strict';
    angular
        .module('blocks.firebase')
        .factory('FirebaseReference', FirebaseReference);

    /* @ngInject */
    function FirebaseReference($firebaseAuth) {

        var service = {
            getHomeRef: getHomeRef
        };

        return service;

        function getHomeRef() {
            return new Firebase("https://ionicfiremohan.firebaseio.com");
        }


    }
})();