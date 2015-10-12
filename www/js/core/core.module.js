(function () {
    'use strict';

    var core = angular
        .module('app.core', [
             'blocks.router', 'blocks.auth', 'blocks.firebase', 'ionic', 'firebase'
        ]);

    /* @ngInject */
    core.run(function ($ionicPlatform, routerHelper, Auth, User, $rootScope, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        Auth.$onAuth(function (authData) {
            if (authData === null) {
                console.log("Not logged in yet");
            } else {
                console.log("Logged in as", authData.uid);
            }
            User.setUser(authData); // This will display the user's name in our view
        });
    });
})();