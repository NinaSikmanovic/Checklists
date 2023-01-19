/**
 * Created by Nikolina 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklist-setup', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('checklist-setup', {
                url: '/checklist-setup/:id',
                parent: 'app',
                views: {
                    content: {
                        controller: 'ChecklistSetupController',
                        controllerAs: 'vm',
                        templateUrl: 'components/checklist-setup/views/checklist-setup.view.html'
                    }
                }
            });
    }
})();
