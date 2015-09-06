'use strict';

describe('Controller: OrderCtrl', function () {
    // load the controller's module
    beforeEach(module('jstestApp'));

    var OrderCtrl,
        scope,
        MenuService,
        OrderService,
        mealId;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        scope = $rootScope.$new();
        MenuService = $injector.get('MenuService');
        OrderService = $injector.get('OrderService');
        mealId = 'cad2d2e8b16eb668f47b4f2827438951';
        OrderService.resetOrder();

        OrderCtrl = $controller('OrderCtrl', {
            $scope: scope
        });
    }));

    it('should increase meal quantity', function () {
        scope.quantityUp(mealId);
        scope.quantityUp(mealId);
        expect(OrderService.getOrder()[mealId].quantity).toBe(2);
    });

    it('should decrease meal quantity', function () {
        scope.quantityUp(mealId);
        scope.quantityUp(mealId);
        scope.quantityDown(mealId);
        expect(OrderService.getOrder()[mealId].quantity).toBe(1);
    });

    it('should get the menu number string correctly', function () {
        var type = 'main';
        expect(scope.getMenuNumber(type,[1])).toBe('1 main');
        expect(scope.getMenuNumber(type,[1,2])).toBe('2 mains');
    });
});
