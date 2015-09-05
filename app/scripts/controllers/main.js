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
        $scope.descriptionLimit = {
            min: 50,
            current: 50,
            max: 500
        };

        $scope.addToOrder = function(mealId) {
            OrderService.addMeal(mealId);
            $rootScope.$broadcast('updateOrder');
        };

        $scope.descriptionToggle = function() {
            if($scope.descriptionLimit.current < $scope.descriptionLimit.max) {
                $scope.descriptionLimit.current = $scope.descriptionLimit.max;
            }
            else {
                $scope.descriptionLimit.current = $scope.descriptionLimit.min;
            }
        };

        MenuService.getMenu().then(function(data) {
            $scope.menu = data;
        });

  }
]);
