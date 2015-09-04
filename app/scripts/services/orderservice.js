'use strict';

/**
 * @ngdoc service
 * @name jstestApp.OrderService
 * @description
 * # OrderService service for the order
 * Service in the jstestApp.
 */
angular.module('jstestApp')
    .factory('OrderService', ['$cookieStore', '$filter', function ($cookieStore, $filter) {

        var cookieId = $filter('translate')('COOKIE_ID_ORDER');

        function addMeal(mealId) {
            var order = $cookieStore.get(cookieId) || {};

            if(order[mealId]) {
                order[mealId].quantity++;
            }
            else {
                order[mealId] = {
                    quantity: 1
                };
            }

            $cookieStore.put(cookieId, order);
        }

        function removeMeal(mealId) {
            var order = $cookieStore.get(cookieId) || {};

            if(order && order[mealId]) {
                if (order[mealId].quantity > 1) {
                    order[mealId].quantity--;
                }
                else {
                    delete order[mealId];
                }
            }

            $cookieStore.put(cookieId, order);
        }

        function getOrder() {
            return $cookieStore.get(cookieId) || {};
        }

        function resetOrder() {
            $cookieStore.put(cookieId, {});
        }

        return {
            addMeal: addMeal,
            removeMeal: removeMeal,
            getOrder: getOrder,
            resetOrder: resetOrder
        };
    }]);
