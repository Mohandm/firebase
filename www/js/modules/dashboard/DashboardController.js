(function () {
    'use strict';
    angular.module('app.dashboard').controller('DashboardController', DashboardController);
    /*ng-inject*/
    function DashboardController($firebaseArray, Auth) {

        var vm = this;
        vm.items;
        vm.input;
        var itemsRef = new Firebase("https://ionicfiremohan.firebaseio.com/items");
        vm.items = $firebaseArray(itemsRef);

        vm.addItem = function (object) {
            vm.items.$add({
                "name": 'jvjv'
            });
        }
    }
})();