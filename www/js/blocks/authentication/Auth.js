(function () {
    'use strict';
    angular
        .module('blocks.auth')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth($firebaseAuth) {
        var ref = new Firebase("https://ionicfiremohan.firebaseio.com");
        return $firebaseAuth(ref);
    }
})();