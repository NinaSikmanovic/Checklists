angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("core/layout/views/layout.view.html","<div><div class=\"header-style\" layout=\"row\" layout-align=\"space-between center\"><div><span ng-if=\"vm.currentState === \'checklist-setup\' || vm.currentState ===\'subtask-setup\'\" class=\"pad-left md-title\" layout=\"row\" layout-align=\"center center\"><i class=\"fa fa-arrow-left icon-size\" aria-hidden=\"true\" ng-click=\"vm.goBack()\"></i><span ng-if=\"vm.currentState === \'checklist-setup\'\" class=\"header-title\">Checklist Setup</span><span ng-if=\"vm.currentState === \'subtask-setup\'\" class=\"header-title\">Task Setup</span></span><span ng-if=\"vm.currentState === \'home\'\" class=\"pad-left md-title\" layout=\"row\" layout-align=\"center center\"><i class=\"fa fa-bars icon-size\" aria-hidden=\"true\"></i><span class=\"header-title\">Checklists</span></span><span ng-if=\"vm.currentState === \'checklist-subtasks\'\" class=\"pad-left md-title\" layout=\"row\" layout-align=\"center center\"><i class=\"fa fa-arrow-left icon-size\" aria-hidden=\"true\" ng-click=\"vm.goBack()\"></i><span class=\"header-title\">Checklist</span></span></div><div><span ng-if=\"vm.currentState === \'checklist-setup\' || vm.currentState ===\'subtask-setup\'\" ng-click=\"showConfirm($event)\"><i class=\"fa fa-trash-o icon-size delete-icon\" aria-hidden=\"true\"></i></span><i class=\"fa fa-filter icon-size filter-icon\" aria-hidden=\"true\"></i><span ng-if=\"vm.currentState === \'checklist-subtasks\'\"><i class=\"fa fa-cog icon-size\" aria-hidden=\"true\"></i></span></div></div></div><ui-view name=\"content\"></ui-view><div class=\"footer\" layout=\"row\" layout-align=\"center center\"><i class=\"fa fa-home fa-2x\" aria-hidden=\"true\"></i></div>");
$templateCache.put("components/checklist-setup/views/checklist-setup.view.html","<md-content class=\"m-top\"><form name=\"projectForm\"><md-input-container name=\"inputContainer\" class=\"md-block input-container\" flex-gt-sm><label class=\"input-label\">Checklist Name</label><input name=\"social\" ng-model=\"vm.checklist.name\" ng-required=\"true\"><div ng-messages=\"projectForm.social.$error\"><div ng-message=\"required\">This is required.</div></div></md-input-container><md-input-container class=\"md-block input-container\"><label class=\"input-label\">Checklist Description</label><textarea rows=\"3\" md-maxlength=\"250\" md-no-asterisk name=\"description\" ng-model=\"vm.checklist.description\"></textarea><div ng-messages=\"projectForm.description.$error\"><div ng-message=\"required\">This is required.</div><div ng-message=\"md-maxlength\">The description must be less than 250 characters long.</div></div></md-input-container><md-input-container class=\"md-block input-container\" flex-gt-sm><label class=\"input-label\">Alert List</label><input name=\"alert\" ng-model=\"vm.alert\"></md-input-container><div class=\"subtask-info\"><input type=\"checkbox\" class=\"round-checkbox\" ng-model=\"vm.checklist.lastDayOfMonth\"><i ng-if=\"vm.checklist.lastDayOfMonth\" class=\"fa fa-check position check-icon\" aria-hidden=\"true\" ng-click=\"\"></i><span class=\"margin-l\">Checklist to be completed at the last day of the month</span></div><div class=\"save-cancel-div\" layout=\"row\" layout-align-xs=\"space-around center\" layout-align=\"center center\"><button ng-click=\"vm.backToHome()\" class=\"cancel save-cancel-button\" aria-label=\"Close\">Cancel</button><button ng-disabled=\"(projectForm.social.$invalid) || (projectForm.description.$invalid)\" ng-click=\"vm.updateChecklist()\" class=\"save save-cancel-button\" aria-label=\"Close\">Save</button></div></form></md-content>");
$templateCache.put("components/checklist-subtasks/views/checklist-subtasks.view.html","<div xmlns=\"http://www.w3.org/1999/html\" class=\"subtasks-containter\"><span class=\"checklist-name\">{{vm.checklist}}</span><div class=\"description\">{{vm.checklistDescription}}</div><ul class=\"md-title title-font\"><li ng-repeat=\"subtask in vm.subtasks\" class=\"subtask expandcollapse-item\" id=\"subtask-div-{{subtask.id}}\" md-swipe-left=\"onSwipeLeft(subtask.id, $event, $target)\" md-swipe-right=\"onSwipeRight(subtask.id, $event, $target)\"><div layout=\"row\" layout-align=\"space-between center\" ng-click=\"active = !active\" ng-class=\"{\'expandcollapse-heading-collapsed\': active, \'expandcollapse-heading-expanded\': !active}\"><div id=\"subtask-left-{{subtask.id}}\"><span ng-if=\"subtask.result.completed || subtask.result.na\"><button class=\"checkbox-round size completed-{{subtask.result.completed}} na-{{subtask.result.na}}\"><i ng-if=\"subtask.result.completed\" class=\"fa fa-check white check-icon\" aria-hidden=\"true\" ng-click=\"vm.removeDone(subtask)\"></i><i ng-if=\"subtask.result.na\" class=\"fa fa-minus white minus-icon\" aria-hidden=\"true\" ng-click=\"vm.removeNotApplicable(subtask)\"></i></button></span><span ng-if=\"!(subtask.result.completed || subtask.result.na)\"><button class=\"checkbox-round size\" ng-click=\"vm.markAsDone(subtask)\" aria-label=\"Close\"></button></span><span class=\"subtask-name\">{{subtask.name}}</span><div ng-if=\"subtask.result.note != null\"><i class=\"fa fa-comment coment-icon\" aria-hidden=\"true\"></i></div></div><div id=\"swipe-subtask-left-{{subtask.id}}\" class=\"swipe-subtask-left\"><span ng-if=\"subtask.important\"><i class=\"fa fa-star star-icon\" aria-hidden=\"true\"></i></span><span ng-if=\"subtask.urgent\"><i class=\"fa fa-exclamation-circle exclamation-icon\" aria-hidden=\"true\"></i></span><span ng-if=\"subtask.completeByTime != null\" class=\"time-badge\">{{subtask.completeByTime}}</span><span class=\"options\" id=\"options-{{subtask.id}}\"><button ng-click=\"showPrompt($event, subtask)\" class=\"btn note-btn\"><i class=\"fa fa-comment-o\" aria-hidden=\"true\"></i><p class=\"md-caption\">Note</p></button><button class=\"btn na-btn\" ng-click=\"vm.markAsNotApplicable(subtask)\" aria-label=\"Close\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i><p class=\"md-caption\">N/A</p></button><a href=\"#!/app/subtask-setup/{{subtask.id}}\"><button class=\"btn setup-btn no-margin\" aria-label=\"Close\"><i class=\"fa fa-cog\" aria-hidden=\"true\"></i><p class=\"md-caption\">Setup</p></button></a></span></div></div><div class=\"slideDown\" ng-hide=\"active\"><span class=\"subtask-information\" ng-if=\"subtask.result.completed\">Marked as done by: Synergy Suite at {{subtask.result.completedTime}}</span><span class=\"subtask-information\" ng-if=\"subtask.result.na\">Marked as N/A by: Synergy Suite at {{subtask.result.completedTime}}</span></div></li></ul><md-button ng-click=\"vm.isClicked = true\" class=\"md-fab\" id=\"myBtn\"><i class=\"angle fa fa-plus\" aria-hidden=\"true\"></i></md-button><div ng-if=\"vm.isClicked\"><form ng-submit=\"vm.addSubtask()\" layout=\"row\" layout-align=\"center center\" class=\"checklist-form\"><input ng-model=\"vm.newSubtask\" type=\"text\" placeholder=\"Type a new subtask here...\" aria-label=\"true\" class=\"newchecklist md-title\" required><i ng-click=\"vm.addSubtask()\" class=\"fa fa-check fa-2x strike\" aria-hidden=\"true\"></i></form></div></div><div class=\"info-div\" ng-if=\"vm.subtasks.length < 1\">No subtasks yet</div>");
$templateCache.put("components/home/views/home.view.html","<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><div><div layout=\"row\" layout-align=\"center center\"><md-input-container class=\"border-outlets md-body-2\"><md-select ng-model=\"vm.selectedOutlet\" ng-model-options=\"{trackBy: \'$value.id\'}\" area-label=\"locations\"><md-option ng-repeat=\"outlet in vm.outlets\" ng-value=\"outlet\" layout=\"row\" ng-click=\"vm.listofChecklists(outlet)\"><i class=\"fa fa-map-marker marker-icon\" aria-hidden=\"true\"></i><span class=\"outlet-name\">{{outlet.name}}</span></md-option></md-select></md-input-container></div></div><div><ul class=\"title-font\"><li ng-repeat=\"checklist in vm.checklists\" class=\"checklist\" id=\"checklist-div-{{checklist.id}}\" md-swipe-left=\"onSwipeLeft(checklist.id, $event, $target)\" md-swipe-right=\"onSwipeRight(checklist.id, $event, $target)\" layout=\"row\" layout-align=\"space-between center\"><div layout=\"row\" layout-align=\"center center\"><div class=\"progress-bar-1\"><div class=\"progress-bar-2\"><div id=\"middle-circle\"><span class=\"progress-text\">{{checklist.numberOfCompleted}}/{{checklist.numberOfSubtasks}}</span></div><div id=\"progress-spinner-{{checklist.id}}\" class=\"progress-spinner\"></div></div></div><a id=\"checklist-left-{{checklist.id}}\" class=\"checklist-name\" href=\"#!/app/checklist-subtasks/{{checklist.id}}\">{{checklist.name}}</a></div><div id=\"swipe-left-{{checklist.id}}\" class=\"swipe-left\"><button class=\"btn delete-btn\" ng-click=\"showConfirm($event, checklist)\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i><p class=\"md-caption\">Delete</p></button><a href=\"#!/app/checklist-setup/{{checklist.id}}\"><button ng-click=\"vm.getCheckListDetail(checklist)\" class=\"btn setup-btn\" aria-label=\"Close\"><i class=\"fa fa-cog\" aria-hidden=\"true\"></i><p class=\"md-caption\">Setup</p></button></a></div></li></ul></div><div><md-button ng-click=\"vm.isClicked = true\" class=\"md-fab\" id=\"myBtn\"><i class=\"angle fa fa-plus\" aria-hidden=\"true\"></i></md-button></div><div ng-if=\"vm.isClicked\"><form ng-submit=\"vm.addChecklist()\" layout=\"row\" layout-align=\"center center\" class=\"checklist-form\" name=\"form\"><input ng-model=\"vm.newChecklist\" type=\"text\" placeholder=\"Type a new checklist here...\" aria-label=\"true\" class=\"newchecklist md-title\" required name=\"input\"><i ng-click=\"vm.addChecklist()\" ng-disabled=\"form.input.$invalid\" class=\"fa fa-check fa-2x strike\" aria-hidden=\"true\"></i></form></div><div class=\"info-div\" ng-if=\"vm.checklists.length < 1\">No checklists yet</div>");
$templateCache.put("components/subtask-setup/views/subtask-setup.view.html","<md-content class=\"m-top\"><form name=\"projectForm\"><md-input-container name=\"inputContainer\" class=\"md-block input-container\" flex-gt-sm><label class=\"input-label\">Task Name</label><input name=\"social\" ng-model=\"vm.subtask.name\" minlength=\"3\" required></md-input-container><md-input-container class=\"md-block input-container\"><label class=\"input-label\">Task Description</label><textarea rows=\"3\" md-maxlength=\"250\" md-no-asterisk name=\"description\" ng-model=\"vm.subtask.description\"></textarea><div ng-messages=\"projectForm.description.$error\"><div ng-message=\"required\">This is required.</div><div ng-message=\"md-maxlength\">The description must be less than 250 characters long.</div></div></md-input-container><span ng-if=\"subtask.completeByTime != null\" class=\"subtask-info\"><i class=\"fa fa-clock-o fa-2x clock-icon\" aria-hidden=\"true\"></i>{{subtask.completeByTime}}</span><div class=\"subtask-info\"><input type=\"checkbox\" class=\"round-checkbox day-{{vm.subtask.lastDayOfMonth}}\" ng-model=\"vm.subtask.lastDayOfMonth\"><i ng-if=\"vm.subtask.lastDayOfMonth\" class=\"fa fa-check position check-icon white\" aria-hidden=\"true\" ng-click=\"\"></i><span class=\"margin-l\">Task to be completed at the last day of the month</span></div><div class=\"subtask-info\"><input type=\"checkbox\" class=\"round-checkbox important-{{vm.subtask.important}}\" ng-model=\"vm.subtask.important\"><i ng-if=\"vm.subtask.important\" class=\"fa fa-check position check-icon white\" aria-hidden=\"true\" ng-click=\"\"></i><span class=\"margin-l\">Important task</span></div><div class=\"subtask-info\"><input type=\"checkbox\" class=\"round-checkbox urgent-{{vm.subtask.urgent}}\" ng-model=\"vm.subtask.urgent\"><i ng-if=\"vm.subtask.urgent\" class=\"fa fa-check position check-icon white\" aria-hidden=\"true\" ng-click=\"\"></i><span class=\"margin-l\">Urgent task</span></div><div class=\"save-cancel-div\" layout=\"row\" layout-align-xs=\"space-around center\" layout-align=\"center center\"><button ng-click=\"vm.backToPrevious()\" class=\"cancel save-cancel-button\" aria-label=\"Close\">Cancel</button><button ng-disabled=\"projectForm.inputContainer.social.$invalid\" ng-click=\"vm.updateSubtask()\" class=\"save save-cancel-button\" aria-label=\"Close\">Save</button></div></form></md-content>");}]);