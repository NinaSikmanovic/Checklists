/**
 * Created by Nikolina on 7/8/22.
 */
(function () {
    'use strict';

    angular
        .module('app.components.home')
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$http', '$q'];

    function HomeService($http, $q) {
        var factory = {
            getOutlets: getOutlets,
            getChecklists: getChecklists,
            addChecklist: addChecklist,
            getOutlet: getOutlet
        };
        return factory;


        function getOutlets(token) {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/permission/allowedCompanies?userId=1490106392118050028',
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

        function getChecklists(token, date, outlet) {
            var deferred = $q.defer();
            var outletId = outlet.id;
            var corporateId = outlet.corporateId;

            var req = {
                method: 'GET',
                url: 'http://api-development.synergysuite.net/rest/checklists/tasks?date=' + date + '&companyId=' + outletId + '&corporateId=' + corporateId + '&personId=1490106392118050028&type=CHECK_LIST',
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

        function addChecklist(token, name, outlet) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: 'http://api-development.synergysuite.net/rest/checklists/tasks/CHECK_LIST',
                headers: {
                    'synergy-login-token': token
                }, data:
                    {
                        "name": name,
                        "companyId": outlet.id,
                        "corporateId": outlet.corporateId,
                        "personId": 1490106392118050028
                    }
            };
            $http(req).then(function (data) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getOutlet(){
            return vm.selectedOutlet;
        }
    }
})();
