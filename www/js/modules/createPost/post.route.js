(function () {
    'use strict';
    angular.module('app.post').run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.post',
                config: {
                    url: '/post',
                    views: {
                        'mainContent': {
                            templateUrl: 'template/createPost/createpost.html',
                            controller: 'PostController as vm'
                        }
                    }
                }
            }
        ];
    }
})();