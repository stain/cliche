'use strict';

angular.module('clicheApp')
    .controller('AddPropertyCtrl', ['$scope', '$modalInstance', 'Data', 'options', function ($scope, $modalInstance, Data, options) {

        $scope.options = options;

        $scope.view = {};

        switch (options.type) {
        case 'input':
            $scope.view.property = {
                type: 'string',
                adapter: {separator: '_'}
            };
            break;
        case 'output':
            $scope.view.property = {type: 'file'};
            break;
        case 'arg':
            $scope.view.property = {separator: '_'};
            break;
        }


        $scope.addProperty = function() {

            $scope.view.form.$setDirty();

            if ($scope.view.form.$invalid) {
                return false;
            }

            Data.addProperty(options.type, $scope.view.name, $scope.view.property);

            $modalInstance.close();

        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /**
         * Update the value if value from is changed
         */
        $scope.changeValueFrom = function() {
            $scope.view.property.value = options.valuesFrom[$scope.view.property.valueFrom];
        };

        $scope.$watch('view.property.value', function(n, o) {
            if (n !== o && !_.isEmpty(n)) {
                $scope.view.property.valueFrom = null;
            }
        });


    }]);