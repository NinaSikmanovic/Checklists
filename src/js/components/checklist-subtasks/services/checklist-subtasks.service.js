/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklist-subtasks')
        .factory('ChecklistSubtasksService', ChecklistSubtasksService);

    ChecklistSubtasksService.$inject = ['$http', '$q'];

    function ChecklistSubtasksService($http, $q) {
        var factory = {
            listOfSubtasks: listOfSubtasks,
            getSubtasksDetail: getSubtasksDetail,
            addSubtask: addSubtask,
            addNote: addNote,
            markAsNotApplicable: markAsNotApplicable,
            removeNotApplicable: removeNotApplicable,
            markAsDone: markAsDone,
            removeDone: removeDone,
            getDateAndTime: getDateAndTime
        };
        return factory;

        function listOfSubtasks(token, date, outlet, checklistId) {
            var deferred = $q.defer();
            var outletId = outlet.id;

            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/checklists/tasks/' + checklistId + '/subtasks?id=' + checklistId + '&companyId=' + outletId + '&personId=1490106392118050028&date=' + date,
                headers: {
                    'synergy-login-token': token
                },
            }
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getSubtasksDetail(token, subtask) {
            var deferred = $q.defer();
            var subtaskId = subtask.id;

            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/checklists/subtasks/' + subtaskId,
                headers: {
                    'synergy-login-token': token
                },
            }
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function addSubtask(token, newSubtask, outlet, checklistId) {
            var deferred = $q.defer();

            var req = {
                method: 'POST',
                url: ' http://api-development.synergysuite.net/rest/checklists/subtasks',
                headers: {
                    'synergy-login-token': token
                }, data:
                    {
                        "name": newSubtask,
                        "taskId": checklistId,
                        "companyId": outlet.id
                    }
            }
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function addNote(token, date, subtask, outlet, note) {
            var deferred = $q.defer();
            var method = '';
            var url = '';
            var data = {};
            var result = subtask.result;
            if (result === null) {
                method = 'POST';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/';
                data = {
                    "subTaskId": subtask.id,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028"
                    },
                    "taskDate": date,
                    "note": note
                };
            } else {
                method = 'PUT';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + result.id;
                data = {
                    "id": result.id,
                    "subTaskId": result.subTaskId,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028",
                    },
                    "note": note,
                    "taskDate": date,
                    "completed": result.completed,
                    "na": result.na
                };
            }

            var req = {
                method: method,
                url: url,
                headers: {
                    'synergy-login-token': token
                },
                data: data
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function markAsNotApplicable(token, date, subtask, outlet) {
            var deferred = $q.defer();
            var method = '';
            var url = '';
            var data = {};
            var result = subtask.result;
            if (result === null) {
                method = 'POST';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/';
                data =
                    {
                        "subTaskId": subtask.id,
                        "companyId": outlet.id,
                        "person": {
                            "id": "1490106392118050028"
                        },
                        "taskDate": date,
                        "completed": false,
                        "completedTime": getDateAndTime(),
                        "na": true,
                        "note": null
                    };
            } else {
                method = 'PUT';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + result.id
                data = {
                    "id": result.id,
                    "subTaskId": result.subTaskId,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028",
                    },
                    "taskDate": date,
                    "completed": false,
                    "completedTime": getDateAndTime(),
                    "na": true
                };
            }

            var req = {
                method: method,
                url: url,
                headers: {
                    'synergy-login-token': token
                },
                data: data
            }
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function removeNotApplicable(token, date, subtask, outlet) {
            var deferred = $q.defer();
            var result = subtask.result;
            var req = {
                method: 'PUT',
                url: 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + result.id,
                headers: {
                    'synergy-login-token': token
                },
                data: {
                    "id": result.id,
                    "subTaskId": result.subTaskId,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028",
                    },
                    "taskDate": date,
                    "completed": false,
                    "na": false
                }
            }
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function markAsDone(token, date, subtask, outlet) {
            var deferred = $q.defer();
            var method = '';
            var url = '';
            var data = {};
            var result = subtask.result;
            if (result === null) {
                method = 'POST';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/'
                data = {
                        "subTaskId": subtask.id,
                        "companyId": outlet.id,
                        "person": {
                            "id": "1490106392118050028"
                        },
                        "taskDate": date,
                        "completedTime": getDateAndTime(),
                        "completed": true,
                        "na": false,
                        "note": null
                    };
            } else {
                method = 'PUT';
                url = 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + result.id;
                data = {
                    "id": result.id,
                    "subTaskId": result.subTaskId,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028",
                    },
                    "taskDate": date,
                    "completedTime": getDateAndTime(),
                    "completed": true,
                    "na": false
                };
            }

            var req = {
                method: method,
                url: url,
                headers: {
                    'synergy-login-token': token
                },
                data: data
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function removeDone(token, date, subtask, outlet) {
            var deferred = $q.defer();
            var result = subtask.result;
            var req = {
                method: 'PUT',
                url: 'http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + result.id,
                headers: {
                    'synergy-login-token': token
                },
                data: {
                    "id": result.id,
                    "subTaskId": result.subTaskId,
                    "companyId": outlet.id,
                    "person": {
                        "id": "1490106392118050028",
                    },
                    "taskDate": date,
                    "completed": false,
                    "na": false
                }
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getDateAndTime() {
            return new Date().toLocaleString();
        }
    }
})
();
