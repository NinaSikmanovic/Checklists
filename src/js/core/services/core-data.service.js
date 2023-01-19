/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.core.services')
        .factory('CoreDataService', CoreDataService);

    CoreDataService.$inject = ['$http', '$q'];

    function CoreDataService($http, $q) {
        var factory = {
            deleteList: deleteList,
            deleteTask: deleteTask,
            setChecklist: setChecklist,
            getChecklist: getChecklist,
            deleteChecklist: deleteChecklist,
            setSubtasks: setSubtasks,
            getSubtasks: getSubtasks,
            setSubtask: setSubtask,
            getSubtask: getSubtask,
            setOutlet: setOutlet,
            getOutlet: getOutlet,
            getDate: getDate,
            getToken:getToken,
            subtasks: null,
            checklist: null,
            outlet: null,
            subtask: null,
            token: '86088f6b-adb4-44cb-ae80-656a73dec55b'
        };
        return factory;

        function deleteList() {
            deleteChecklist(factory.checklist);
        }

        function getToken(){
            return factory.token;
        }

        function deleteTask() {
            deleteSubtask(factory.subtask);
        }

        function setChecklist(checklist) {
            factory.checklist = checklist;
        }

        function getChecklist() {
            return factory.checklist;
        }

        function setSubtasks(subtasks) {
            factory.subtasks = subtasks;
        }

        function getSubtasks() {
            return factory.subtasks;
        }

        function setSubtask(subtask) {
            factory.subtask = subtask;
        }

        function getSubtask() {
            return factory.subtask;
        }


        function deleteChecklist(checklist) {
            var deferred = $q.defer();
            var req = {
                method: 'DELETE',
                url: ' http://api-development.synergysuite.net/rest/checklists/tasks/' + checklist.id,
                headers: {
                    'synergy-login-token': factory.token
                },
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function  deleteSubtask(subtask){
            var deferred = $q.defer();
            var req = {
                method: 'DELETE',
                url: ' http://api-development.synergysuite.net/rest/checklists/subtasks/' + subtask.id,
                headers: {
                    'synergy-login-token': factory.token
                },
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function setOutlet(outlet) {
            factory.outlet = outlet;
        }

        function getOutlet() {
            return factory.outlet;
        }

        function getDate(id) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/companyDates/currentBusinessDate/' + id,
                headers: {
                    'synergy-login-token': factory.token
                },
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

    }
})();
