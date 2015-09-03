'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$cookieStore', 'MenuService', 'OrderService', function ($scope, $rootScope, $cookieStore, MenuService, OrderService) {

        $scope.menu = {};

        $scope.addToOrder = function(mealId) {
            OrderService.addMeal(mealId);
            $rootScope.$broadcast('updateOrder');
        };

        MenuService.getMenu().then(function(data) {
            $scope.menu = data;
        });

  }
]);
