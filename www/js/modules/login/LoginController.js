(function () {
    'use strict';
    angular.module('app.login').controller('LoginController', LoginController);
    /* @ngInject */
    function LoginController(FirebaseReference, User, $state, $rootScope) {
        /* jshint validthis: true */

        var vm = this;
        var ref = new Firebase("https://ionicfiremohan.firebaseio.com");
        vm.login = function () {
            FirebaseReference.getHomeRef().authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    User.setUser(null);
                } else {
                    User.setUser(authData);
                    console.log(authData);
                    $rootScope.userImg = authData.facebook.profileImageURL;
                    $rootScope.userName = authData.facebook.displayName;
                    $state.go('app.dashboard');
                }
            });
        };


        vm.logout = function () {
            FirebaseReference.getHomeRef().unauth();
        };
    }
})();