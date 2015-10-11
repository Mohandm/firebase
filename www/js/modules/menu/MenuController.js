(function () {
    'use strict';
    angular.module('app.core').controller('MenuController', MenuController);
    /*ng-inject*/
    function MenuController(User) {

        var vm = this;
        console.log(User.getUser());
    }
})();