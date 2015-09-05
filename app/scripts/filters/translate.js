'use strict';

/**
 * @ngdoc function
 * @name jstestApp.filter:translate
 * @description
 * # translate the tag to a string
 * Filter of the jstestApp
 */
angular.module('jstestApp')
    .filter('translate', function() {
        return function(key) {

            return {
                // Strings
                'CURRENCY': '£',
                'ORDER': 'Your Order',
                'ORDER_CONFIRM': 'Confirm your order',
                'ORDER_ADD': 'Add To Your Order',
                'RESTAURANT_NAME': 'A Delicious Restaurant',
                'ORDER_TIME': 'It\'s time to order some delicious food',
                // Cookies
                'COOKIE_ID_ORDER': 'order',
                // Tags
                'TAG_MAIN_COURSE': '#course:main_courses'
            }[key];
        };
    });
