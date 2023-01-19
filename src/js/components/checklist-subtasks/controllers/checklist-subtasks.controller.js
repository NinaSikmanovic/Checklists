(function () {
    'use strict';

    angular
        .module('app.components.checklist-subtasks')
        .controller('ChecklistSubtasksController', ChecklistSubtasksController);

    ChecklistSubtasksController.$inject = ['$http', '$scope', 'ChecklistSubtasksService', '$stateParams', '$location', 'CoreDataService', '$mdDialog', 'toastr'];

    function ChecklistSubtasksController($http, $scope, ChecklistSubtasksService, $stateParams, $location, CoreDataService, $mdDialog, toastr) {
        var vm = this;
        vm.checklistId = $stateParams.id;
        vm.getSubtasks = getSubtasks;
        vm.getSubtasksDetail = getSubtasksDetail;
        vm.addSubtask = addSubtask;
        vm.addNote = addNote;
        vm.$onInit = onInit;
        vm.markAsNotApplicable = markAsNotApplicable;
        vm.removeNotApplicable = removeNotApplicable;
        vm.markAsDone = markAsDone;
        vm.removeDone = removeDone;
        vm.subtasks = [];
        vm.isClicked = false;
        vm.token = CoreDataService.getToken();
        $scope.onSwipeLeft = onSwipeLeft;
        $scope.onSwipeRight = onSwipeRight;
        $scope.showPrompt = showPrompt;
        $scope.active = true;
        $scope.active1 = true;

        function onInit() {
            getSubtasks();
        }

        function setChecklist() {
            CoreDataService.setChecklist(vm.checklistId);
        }

        function getSubtasks() {
            vm.outlet = CoreDataService.getOutlet();
            listOfSubtasks(vm.outlet, vm.checklistId);
            setChecklist();
        }

        function listOfSubtasks(outlet, checklist) {
            CoreDataService.getDate(outlet.id).then(function (response) {
                vm.date = response.data;
                ChecklistSubtasksService.listOfSubtasks(vm.token, vm.date, outlet, checklist).then(function (response) {
                    vm.checklist = response.data.name;
                    vm.subtasks = response.data.subTasks;
                    vm.numberOfSubtasks = vm.subtasks.length;
                }, function () {
                    window.alert('problem with loading subtasks');
                });
            });
        }

        function getSubtasksDetail(subtask) {
            ChecklistSubtasksService.getSubtasksDetail(vm.token, subtask).then(function (response) {
            }, function () {
                window.alert('problem with loading subtask details');
            });
        }

        function addSubtask() {
            ChecklistSubtasksService.addSubtask(vm.token, vm.newSubtask, vm.outlet, vm.checklistId).then(function (response) {
                vm.newSubtask = '';
                vm.isClicked = false;
                getSubtasks();
            }, function () {
                window.alert('problem with adding subtask');
            });
        }

        function addNote(subtask, note) {
            ChecklistSubtasksService.addNote(vm.token, vm.date, subtask, vm.outlet, note).then(function (response) {
                getSubtasks();
                toastr.success('Note added!');
            }, function () {
                window.alert('problem with adding note');
                toastr.error('Error', 'Problem with adding note');
            });
        }

        function showPrompt(ev, subtask) {
            var initialValue = '';
            if (subtask.result != null) {
                initialValue = subtask.result.note;
            }
            var confirm = $mdDialog.prompt()
                .title(subtask.name + ' - Note')
                .targetEvent(ev)
                .initialValue(initialValue)
                .required(true)
                .ok('Save')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                vm.addNote(subtask, result);
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        }

        function markAsNotApplicable(subtask) {
            ChecklistSubtasksService.markAsNotApplicable(vm.token, vm.date, subtask, vm.outlet).then(function (response) {
                getSubtasks();
                toastr.success('subtask marked as N/A!');
            }, function () {
                window.alert('problem with marking as not applicable');
            });
        }

        function removeNotApplicable(subtask) {
            ChecklistSubtasksService.removeNotApplicable(vm.token, vm.date, subtask, vm.outlet).then(function (response) {
                getSubtasks();
            }, function () {
                window.alert('problem with removing not applicable');
            });
        }

        function markAsDone(subtask) {
            ChecklistSubtasksService.markAsDone(vm.token, vm.date, subtask, vm.outlet).then(function (response) {
                getSubtasks();
                toastr.success('subtask marked as done!');
            }, function () {
                window.alert('problem with marking the subtask as done');
            });
        }

        function removeDone(subtask) {
            ChecklistSubtasksService.removeDone(vm.token, vm.date, subtask, vm.outlet).then(function (response) {
                getSubtasks();
            }, function () {
                window.alert('problem with removing done');
            });
        }

        $(function () {
            $("div.box").on("swipeleft", swipeleftHandler);
            $("div.box").on("swiperight", swiperightHandler);

            function swipeleftHandler(event) {
                $(event.target).addClass("swipeleft");
                $(this).hide();
            }

            function swiperightHandler(event) {
                $(event.target).addClass("swiperight");
                $(this).show();
            }
        });

        function onSwipeLeft(subtaskId, event, target) {
            $("#subtask-div-" + subtaskId).css("padding", "5px 0 0 15px");
            $("#options-" + subtaskId).show();
        }

        function onSwipeRight(subtaskId, event, target) {
            $("#subtask-div-" + subtaskId).css("padding", "5px 0 5px 15px");
            $("#swipe-subtask-left-" + subtaskId).hide();
        }
    }
})();
