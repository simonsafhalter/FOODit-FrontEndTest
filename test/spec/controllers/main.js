'use strict';

describe('Controller: MainCtrl', function () {
    // load the controller's module
    beforeEach(module('jstestApp'));

    var MainCtrl,
        scope,
        MenuService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector, $q) {
        scope = $rootScope.$new();
        MenuService = $injector.get('MenuService');

        var deferred = $q.defer();
        deferred.resolve({
            resultCount: 2,
            meals: [{},{}]
        });
        spyOn(MenuService, 'getMenu').and.returnValue(deferred.promise);

        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should call the menu service to retrieve a list of meals', function () {
        MenuService.getMenu();
        scope.$apply(); // getMenu returns a promise, execute $apply to refresh
        expect(scope.menu.resultCount).toBe(2);
    });

    it('should toggle the description truncation', function () {
        var index = 0;
        MenuService.getMenu();
        scope.$apply(); // getMenu returns a promise, execute $apply to refresh
        expect(scope.menu.meals[index].descriptionExtended).toBe(undefined);
        scope.descriptionToggle(index);
        expect(scope.menu.meals[index].descriptionExtended).toBe(true);
        scope.descriptionToggle(index);
        expect(scope.menu.meals[index].descriptionExtended).toBe(false);
    });
});
