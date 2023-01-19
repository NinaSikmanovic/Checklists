/**
 * Created by Nikolina on 7/8/22.
 */
(function(){
    'use strict';

    angular
        .module('app.components.checklist-subtasks', [])
        .config(config);

    config.$inject = ['$stateProvider' ];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('checklist-subtasks', {
                url: '/checklist-subtasks/:id',
                parent: 'app',
                views: {
                    content: {
                        controller: 'ChecklistSubtasksController',
                        controllerAs: 'vm',
                        templateUrl: 'components/checklist-subtasks/views/checklist-subtasks.view.html'
                    }
                }
            });
    }
})();
