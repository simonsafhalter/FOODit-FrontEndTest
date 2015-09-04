'use strict';

/**
 * @ngdoc service
 * @name jstestApp.Menuservice
 * @description
 * # MenuService
 * Service in the jstestApp.
 */
angular.module('jstestApp')
	.factory('MenuService', ['$http', '$q', function ($http, $q) {

        var menu;

		function getMenu() {
            var deferred = $q.defer();

            if (menu) {
                deferred.resolve(menu);
            }
            else {
                $http.get('/data/menu.json').success(function(data) {
                    menu = data;
                    deferred.resolve(menu);
                });
            }

            return deferred.promise;
		}

        return {
            getMenu: getMenu
        };
	}]);
