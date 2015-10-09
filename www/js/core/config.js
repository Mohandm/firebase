(function () {
    'use strict';

    var core = angular.module('app.core');

    //Toaster Config for messages.
/*    core.config(toastrConfig);*/
    /* @ngInject */
 /*   function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-top-center';
    }*/

    //Other configuration
    core.config(configure);
    /* @ngInject */
    function configure($logProvider, routerHelperProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        /*exceptionHandlerProvider.configure(config.appErrorPrefix);*/
        routerHelperProvider.configure({
            docTitle: '' + ': '
        });
    }
   /* core.config(configureInterceptor);*/
    /* @ngInject */
  /*  function configureInterceptor($httpProvider) {
      // Configure $http to catch authentication error responses
      $httpProvider.interceptors.push(['$injector', function ($injector) {
          return $injector.get('AuthInterceptorService');
        }]);
  }*/
})();