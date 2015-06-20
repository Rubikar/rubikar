'use strict';

describe('Home Controller Suite', function() {
  var scope, ctrl;

  beforeEach(function() {
    angular.module('Rubikar');
  });
  describe('General Tests', function() {
    it('Controller should exists', function() {
      inject(function(_$controller_) {
        var $controller = _$controller_;
        console.log($controller('HomeController', {
          $scope: scope
        }))
      });
      expect(ctrl).toBeDefined();
    });
    it('foo should be bar', function() {
      expect(scope.foo).toEqual('bar');
    });
  });
});