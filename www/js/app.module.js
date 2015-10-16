(function () {
    'use strict';
    angular.module('firebaseApp', [

        'app.core',
        'app.widgets',

        /*
         * Feature areas
         */
        'app.dashboard',
        'app.login',
        'app.post'

    ]);

})();
