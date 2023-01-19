(function () {
    'use strict';

    angular
        .module('app.components.checklist-setup')
        .controller('ChecklistSetupController', ChecklistSetupController);

    ChecklistSetupController.$inject = ['$http', '$scope', 'ChecklistSetupService', '$stateParams', '$location', 'CoreDataService'];

    function ChecklistSetupController($http, $scope, ChecklistSetupService, $stateParams, $location, CoreDataService) {
        var vm = this;
        vm.$onInit = onInit;
        vm.getCheckListDetail = getCheckListDetail;
        vm.updateChecklist = updateChecklist;
        vm.backToHome = backToHome;
        vm.checklistId = $stateParams.id;
        vm.token = CoreDataService.getToken();

        $scope.project = {
            rate: 500,
            special: true
        };

        function onInit() {
            getCheckListDetail(vm.checklistId);
        }

        function getCheckListDetail(checklistId) {
            ChecklistSetupService.getCheckListDetail(vm.token, checklistId).then(function (response) {
                vm.checklist = response.data;
                CoreDataService.setChecklist(vm.checklist);
            }, function () {
                window.alert('problem with loading checklist details');
            });
        }

        function updateChecklist() {
            ChecklistSetupService.updateChecklist(vm.token, vm.checklist).then(function (response) {
                getCheckListDetail(response.data.id);
            }, function () {
                window.alert('problem with updating checklist');
            });
            backToHome();
        }

        function backToHome() {
            window.history.back();
        }
    }
})();
