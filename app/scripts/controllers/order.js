'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
    .controller('OrderCtrl', ['$scope', 'MenuService', 'OrderService', function ($scope, MenuService, OrderService) {

        var tagMainCourse = '#course:main_courses';

        $scope.mainMeals = [];
        $scope.otherMeals = [];

        $scope.$on('updateOrder', function() {
            updateOrder();
        });

        $scope.quantityUp = function (mealId) {
            OrderService.addMeal(mealId);
            updateOrder();
        };

        $scope.quantityDown = function (mealId) {
            OrderService.removeMeal(mealId);
            updateOrder();
        };

        function updateOrder() {

            var order = OrderService.getOrder(),
                meals = {
                    main: [],
                    other: []
                },
                totalPrice = 0.0,
                meal,
                isMainCourse = false,
                i,
                j;

            MenuService.getMenu().then(function(menu) {

                for (i = 0; i < menu.meals.length; i++) {
                    meal = menu.meals[i];
                    isMainCourse = false;

                    if (order[meal.id]) {
                        meal.quantity = order[meal.id].quantity;

                        if (meal.tags) {
                            for (j = 0; j < meal.tags.length; j++) {
                                if (meal.tags[j] === tagMainCourse) {
                                    meals.main.push(meal);
                                    isMainCourse = true;
                                    break;
                                }
                            }
                        }

                        if (!isMainCourse) {
                            meals.other.push(meal);
                        }

                        totalPrice += parseFloat(meal.price * meal.quantity);
                    }
                }

                $scope.meals = meals;
                $scope.totalPrice = totalPrice;
            });
        }

        updateOrder();
  }
]);
