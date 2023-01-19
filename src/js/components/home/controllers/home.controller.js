/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'HomeService', '$log', '$mdDialog', 'CoreDataService', 'ChecklistSubtasksService', 'toastr'];

    /**
     * Home controller
     * @param $scope
     * @param HomeService
     * @constructor
     */
    function HomeController($scope, HomeService, $log, $mdDialog, CoreDataService, ChecklistSubtasksService, toastr) {
        var vm = this;
        vm.isClicked = false;
        vm.outlets = [];
        vm.checklists = [];
        vm.selectedOutlet = '';
        vm.token = CoreDataService.getToken();

        function onInit() {
            getOutlets();
        }

        function getOutlets() {
            HomeService.getOutlets(vm.token).then(function (response) {
                vm.outlets = response.data;
                var outletFromService = CoreDataService.getOutlet();
                if (outletFromService) {
                    vm.selectedOutlet = outletFromService;
                } else {
                    vm.selectedOutlet = vm.outlets[15];
                }
                listOfChecklists(vm.selectedOutlet);
            }, function () {
                window.alert('problem with loading outlets');
            });
        }

        function listOfChecklists(outlet) {
            CoreDataService.setOutlet(outlet);
            CoreDataService.getDate(outlet.id).then(function (response) {
                HomeService.getChecklists(vm.token, response.data, outlet).then(function (response) {
                    vm.checklists = response.data;
                    vm.checklists.forEach(function (checklistItem) {
                        vm.numberOfSubtasks(checklistItem);
                    });
                });
            }, function () {
                window.alert('problem with loading checklists');
            });
        }

        function numberOfSubtasks(checklist) {
            var numberOfCompleted = 0;
            var numberOfSubtasks = 0;
            if ((checklist.subTasks != null) && (checklist.subTasks.length > 0)) {
                vm.subtasks = checklist.subTasks;
                var numberOfSubtasks = vm.subtasks.length;

                vm.subtasks.forEach(function (subtaskItem) {
                    if (subtaskItem.result != null) {
                        if (subtaskItem.result.completed === true) {
                            numberOfCompleted = numberOfCompleted + 1;
                        }
                    }
                });
            }

            checklist.numberOfSubtasks = numberOfSubtasks;
            checklist.numberOfCompleted = numberOfCompleted;
            setTimeout(function () {
                vm.showProgress(checklist, numberOfSubtasks, numberOfCompleted);
            });
        }

        function showProgress(checklist, numberOfSubtasks, numberOfCompleted) {
            document.getElementById("progress-spinner-" + checklist.id).style.background =
                "conic-gradient(rgb(248, 125, 73) " +
                (numberOfCompleted / numberOfSubtasks * 100) +
                "%,rgb(242, 242, 242) " +
                (numberOfCompleted / numberOfSubtasks * 100) +
                "%)";
        }


        function addChecklist() {
            HomeService.addChecklist(vm.token, vm.newChecklist, vm.selectedOutlet).then(function (response) {
                vm.newChecklist = '';
                vm.isClicked = false;
                listOfChecklists(vm.selectedOutlet);
            }, function () {
                window.alert('problem with adding checklist');
            });
        }

        function deleteChecklist(checklist) {
            CoreDataService.deleteChecklist(checklist).then(function (response) {
                listOfChecklists(vm.selectedOutlet);
            }, function () {
                window.alert('problem with adding checklist');
            });
        }

        function showConfirm(ev, checklist) {
            var confirm = $mdDialog.confirm()
                .title('Delete checklist')
                .textContent('Are you sure that you want to delete the checklist?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                vm.deleteChecklist(checklist);
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        }

        function onSwipeLeft(checklistId, event, target) {
            $("#checklist-div-" + checklistId).css("padding", "0");
            $("#swipe-left-" + checklistId).show();
            $("#checklist-left-" + checklistId).animate({marginLeft: '-20px'}, "fast");
            $(".progress-bar-1").hide();
        }

        function onSwipeRight(checklistId, event, target) {
            $("#checklist-div-" + checklistId).css("padding", "0.5 em");
            // $("#swipe-left-" + checklistId).hide();
            $("#checklist-left-" + checklistId).animate({marginLeft: '6px'}, "fast");
            $(".progress-bar-1").show();
        }

        vm.$onInit = onInit;
        vm.listofChecklists = listOfChecklists;
        vm.getOutlets = getOutlets;
        vm.addChecklist = addChecklist;
        vm.deleteChecklist = deleteChecklist;
        vm.showProgress = showProgress;
        vm.numberOfSubtasks = numberOfSubtasks;
        $scope.onSwipeLeft = onSwipeLeft;
        $scope.onSwipeRight = onSwipeRight;
        $scope.showConfirm = showConfirm;

    }
})
();
