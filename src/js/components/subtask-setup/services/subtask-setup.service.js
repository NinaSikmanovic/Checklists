/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.subtask-setup')
        .factory('SubtaskSetupService', SubtaskSetupService);

    SubtaskSetupService.$inject = ['$http', '$q'];

    function SubtaskSetupService($http, $q) {
        var factory = {
            getSubtasksDetails: getSubtasksDetails,
            updateSubtask: updateSubtask
        };
        return factory;

        function getSubtasksDetails(token, subtaskId) {
            var deferred = $q.defer();

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

        function updateSubtask(token, subtask) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: 'http://api-development.synergysuite.net/rest/checklists/subtasks',
                headers: {
                    'synergy-login-token': token,
                }, data: {
                    "id": subtask.id,
                    "taskId": subtask.taskId,
                    "name": subtask.name,
                    "description": subtask.description,
                    "urgent": subtask.urgent,
                    "important": subtask.important,
                    "lastDayOfMonth": subtask.lastDayOfMonth
                }
            };

            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})
();
