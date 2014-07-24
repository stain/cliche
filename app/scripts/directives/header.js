'use strict';

angular.module('clicheApp')
    .service('Header', [function () {

        var self = {};

        self.active = 'apps';

        /**
         * Set the active page
         * @param active
         */
        self.setActive = function (active) {
            self.active = active;
        };

        /**
         * Get the active page
         * @returns {string}
         */
        self.getActive = function () {
            return self.active;
        };

        return self;

    }])
    .directive('header', ['$templateCache', '$timeout', '$route', 'User', 'Header', function ($templateCache, $timeout, $route, User, Header) {
        return {
            restrict: 'E',
            replace: true,
            template: $templateCache.get('views/partials/header.html'),
            scope: {},
            link: function (scope) {

                scope.view = {};
                scope.view.loading = true;
                scope.view.active = Header.getActive();

                scope.UserMdl = User;
                scope.HeaderService = Header;

                User.getUser().then(function(user) {
                    scope.view.user = user;
                    scope.view.loading = false;
                });

                /**
                 * Log Out the user
                 */
                scope.logOut = function() {

                    User.logOut().then(function() {
                        scope.view.user = {};
                        $route.reload();
                    });
                };

                scope.$watch('HeaderService.active', function (n, o) {
                    if (n !== o) {
                        scope.view.active = n;
                    }
                });

                scope.$watch('UserMdl.user', function(n, o) {
                    if (n !== o) {
                        console.log(n);
                        scope.view.user = n;
                    }
                });

            }
        };
    }]);