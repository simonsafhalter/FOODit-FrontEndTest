'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:OrderCtrl
 * @description
 * # OrderCtrl controls the order.html view
 * Controller of the jstestApp
 */
angular.module('jstestApp')
    .controller('OrderCtrl', ['$scope', '$filter', '$q', 'MenuService', 'OrderService', function ($scope, $filter, $q, MenuService, OrderService) {

        var tagMainCourse = $filter('translate')('TAG_MAIN_COURSE');
        $scope.meals = [];
        $scope.totalPrice = 0.0;

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

        $scope.getMenuNumber = function(type, array) {
            return array.length + ' ' + type + (array.length === 1 ? '' : 's');
        };

        function updateOrder() {
            var deferred = $q.defer();

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

                // iterate through the menu
                for (i = 0; i < menu.meals.length; i++) {
                    meal = menu.meals[i];
                    isMainCourse = false;

                    // if we have that meal on our order
                    if (order[meal.id]) {
                        meal.quantity = order[meal.id].quantity;

                        if (meal.tags) {
                            // check if meal is a main course
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
                deferred.resolve();
            });

            return deferred.promise;
        }

        updateOrder();
    }
]);
