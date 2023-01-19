/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklist-setup')
        .factory('ChecklistSetupService', ChecklistSetupService);

    ChecklistSetupService.$inject = ['$http', '$q'];

    function ChecklistSetupService($http, $q) {
        var factory = {
            getCheckListDetail: getCheckListDetail,
            updateChecklist: updateChecklist,
        };
        return factory;

        function getCheckListDetail(token, checklistId) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/checklists/tasks/' + checklistId,
                headers: {
                    'synergy-login-token': token
                },
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateChecklist(token, checklist) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: 'http://api-development.synergysuite.net/rest/checklists/tasks/CHECK_LIST',
                headers: {
                    'synergy-login-token': token
                }, data:
                    {
                        'id': checklist.id,
                        "name": checklist.name,
                        "description": checklist.description,
                        "completeByTime": null,
                        "validDates": null,
                        "corporateId": checklist.corporateId,
                        "companyId": checklist.companyId,
                        "lastDayOfMonth": checklist.lastDayOfMonth
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

})();
