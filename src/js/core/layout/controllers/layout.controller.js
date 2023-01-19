/**
 * Created by Nikoljna on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.core.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope', '$state', '$location', '$transitions', 'CoreDataService', '$mdDialog'];

    /**
     * LayoutController
     * @param $scope
     * @constructor
     */
    function LayoutController($scope, $state, $location, $transitions, CoreDataService, $mdDialog) {
        var vm = this;
        console.log($state);
        vm.currentState = $state.current.name;
        vm.goBack = goBack;
        vm.deleteSubtask = deleteSubtask;
        vm.deleteChecklist = deleteChecklist;
        $scope.showConfirm = showConfirm;

        function goBack() {
            window.history.back();
        }

        function deleteChecklist() {
            CoreDataService.deleteList();
        }

        function deleteSubtask() {
            CoreDataService.deleteTask();
        }

        function showConfirm(ev) {
            var textContent = '';
            var title = '';
            if (vm.currentState === 'checklist-setup') {
                textContent = 'Are you sure that you want to delete a checklist?';
                title = 'checklist';

            }
            else{
                textContent = 'Are you sure that you want to delete a subtask?';
                title = 'subtask';
            }
            var confirm = $mdDialog.confirm()
                .title('Delete '+ title)
                .textContent(textContent)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                if (vm.currentState === 'checklist-setup') {
                    vm.deleteChecklist();
                } else {
                    vm.deleteSubtask();
                }
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        }

        $transitions.onSuccess({}, function (transition) {
            vm.currentState = transition.to().name;
        });

    }
})();
