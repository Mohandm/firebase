(function () {
    'use strict';
    angular.module('app.login').run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'template/login/login.html',
                    controller: 'LoginController as vm'
                }
            }
        ];
    }
})();