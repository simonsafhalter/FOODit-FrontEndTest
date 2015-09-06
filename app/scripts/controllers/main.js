'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$cookieStore', '$filter', 'MenuService', 'OrderService', function ($scope, $rootScope, $cookieStore, $filter, MenuService, OrderService) {

        $scope.menu = {};
        $scope.descriptionLimit = $filter('translate')('DESCRIPTION_LIMIT');

        $scope.addToOrder = function(mealId) {
            OrderService.addMeal(mealId);
            $rootScope.$broadcast('updateOrder');
        };

        $scope.descriptionToggle = function($index) {
            $scope.menu.meals[$index].descriptionExtended = !$scope.menu.meals[$index].descriptionExtended;
        };

        MenuService.getMenu().then(function(data) {
            $scope.menu = data;
        });
    }
]);
