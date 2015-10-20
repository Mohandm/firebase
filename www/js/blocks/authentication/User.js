(function () {
    'use strict';
    angular
        .module('blocks.auth')
        .factory('User', User);

    /* @ngInject */
    function User($rootScope) {
        var user;
        var service = {

            getUser: getUser,
            setUser: setUser
        };

        return service;

        function getUser() {
            return user;
        }

        function setUser(userObj) {

            if (userObj && userObj !== null) {
                user = {};
                user.uid = userObj.uid;
                user.displayName = userObj.facebook.displayName;
                user.userImg = userObj.facebook.profileImageURL;

                $rootScope.userImg = userObj.facebook.profileImageURL;
                $rootScope.userName = userObj.facebook.displayName;
            }
        }
    }
})();