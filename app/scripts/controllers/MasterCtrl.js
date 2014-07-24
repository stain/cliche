'use strict';

angular.module('clicheApp')
    .controller('MasterCtrl', ['$scope', function ($scope) {

        $scope.view = {};
        $scope.view.classes = ['page'];

        $scope.$on('classChange', function(event, classes) {
            $scope.view.classes = classes;
        });

    }]);