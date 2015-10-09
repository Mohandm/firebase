(function() {
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
                    templateUrl: 'content/mobile/app/modules/login/login.html',
                    controller: 'LoginController as vm',
                    resolve: {
                        /* @ngInject */
                        preProcessData: function ($http, ContextProvider, Session) {
                           return $http.post(ContextProvider.getContext() + "/screen/MobileResourceScreen/action/MobileResorceAction")
                                .then(function (response) {
                                    Session.setMode(response.data.mode);
                                    Session.setUserName(response.data.username);
                                    Session.setCompany(response.data.company);
                                }).catch(function (msg) {

                                });
                        }
                    },
                    isLogin : true
                }
            }
        ];
    }
})();


