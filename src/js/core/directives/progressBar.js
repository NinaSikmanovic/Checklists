/**
 * Created by Nikolina on 28.7.22.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('progressBar', progressBar)

        .$inject = [];

    function progressBar() {

        // function link($scope, element, attr) {
        //     debugger
        //     $scope.checklist
        // }
    //
    //     return {
    //         // link: link,
    //         restrict: 'E',
    //         replace: true,
    //         scope: {
    //             checklist: "="
    //         },
    //         templateUrl: 'core/directives/progressBar.html',
    //     };

        return {
            restrict: 'E',
            scope: {
                checklist: "="
            },
            transclude:true,
            templateUrl: 'core/directives/progressBar.html',
            link: function (scope, element, attrs) {

            }
        };
    }

})();
