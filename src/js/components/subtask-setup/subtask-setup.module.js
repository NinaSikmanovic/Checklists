/**
 * Created by Nikolina 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.subtask-setup', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('subtask-setup', {
                url: '/subtask-setup/:id',
                parent: 'app',
                views: {
                    content: {
                        controller: 'SubtaskSetupController',
                        controllerAs: 'vm',
                        templateUrl: 'components/subtask-setup/views/subtask-setup.view.html'
                    }
                }
            });
    }
})();
