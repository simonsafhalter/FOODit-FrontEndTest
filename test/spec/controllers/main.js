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
        deferred.resolve({resultCount: 1});
        spyOn(MenuService, 'getMenu').and.returnValue(deferred.promise);

        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should call the menu service to retrieve a list of meals', function () {
        MenuService.getMenu();
        scope.$apply(); // getMenu returns a promise, execute $apply to execute the promise
        expect(scope.menu.resultCount).toBe(1);
    });
});
