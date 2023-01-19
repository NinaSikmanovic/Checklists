(function () {
    'use strict';

    angular
        .module('app.components.subtask-setup')
        .controller('SubtaskSetupController', SubtaskSetupController);

    SubtaskSetupController.$inject = ['$http', '$scope', 'SubtaskSetupService', '$stateParams', '$location', 'CoreDataService'];

    function SubtaskSetupController($http, $scope, SubtaskSetupService, $stateParams, $location, CoreDataService) {
        var vm = this;
        vm.$onInit = onInit;
        vm.updateSubtask = updateSubtask;
        vm.backToPrevious = backToPrevious;
        vm.subtaskId = $stateParams.id;
        vm.getSubtasksDetails = getSubtasksDetails;
        vm.token = CoreDataService.getToken();

        function onInit() {
            getSubtasksDetails();
        }

        function getSubtasksDetails() {
            SubtaskSetupService.getSubtasksDetails(vm.token, vm.subtaskId).then(function (response) {
                vm.subtask = response.data;
                CoreDataService.setSubtask(vm.subtask);
            }, function () {
                window.alert('problem with loading subtask-setup page');
            });
        }

        function backToPrevious() {
            window.history.back();
        }

        function updateSubtask() {
            SubtaskSetupService.updateSubtask(vm.token, vm.subtask).then(function (response) {
                vm.subtask = response.data;
                getSubtasksDetails();
                backToPrevious();
            }, function () {
                window.alert('problem with marking a subtask as urgent');
            });
        }
    }
})();
