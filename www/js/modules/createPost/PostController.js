(function () {
    'use strict';
    angular.module('app.post').controller('PostController', PostController);
    /*ng-inject*/
    function PostController($firebaseArray, Auth, User) {

        var vm = this;
        var itemsRef = new Firebase("https://ionicfiremohan.firebaseio.com/items");
        var ref = $firebaseArray(itemsRef);

        vm.submit = function (object) {
            object.user = User.getUser();
            ref.$add({
                object
            });
        }
    }
})();