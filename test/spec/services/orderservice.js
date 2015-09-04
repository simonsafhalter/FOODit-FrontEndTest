'use strict';

describe('Service: OrderService', function () {
    // load the service's module
    beforeEach(module('jstestApp'));

    // instantiate service
    var OrderService,
        mealId;

    beforeEach(inject(function ($injector) {
        OrderService = $injector.get('OrderService');
        OrderService.resetOrder();
        mealId = 'cad2d2e8b16eb668f47b4f2827438951';
    }));

    it('should do something', function () {
        expect(!!OrderService).toBe(true);
    });

    it('should add a meal and retrieve it successfully', function() {
        OrderService.addMeal(mealId);
        expect(OrderService.getOrder()[mealId].quantity).toBe(1);
    });

    it('should remove a meal successfully', function() {
        OrderService.addMeal(mealId);
        expect(OrderService.getOrder()[mealId].quantity).toBe(1);
        OrderService.removeMeal(mealId);
        expect(OrderService.getOrder()[mealId]).toBe(undefined);
    });
});
