"use strict";

angular.module('clicheApp')
    .factory('User', ['Api', function (Api) {

        var self = {};

        self.user = {};

        /**
         * Get user's details
         *
         * @returns {object} $promise
         */
        self.getUser = function() {

            var promise = Api.user.get().$promise;

            return promise;

        };

        /**
         * Set current user
         *
         * @param user
         */
        self.setUser = function(user) {
            self.user = user;
        };

        /**
         * Log In the user
         *
         * @params {string} email
         * @params {string} password
         * @returns {object} $promise
         */
        self.logIn = function(email, password) {

            var promise = Api.user.login({email: email, password: password}).$promise;

            return promise;

        };

        /**
         * Log Out the user
         *
         * @returns {object} $promise
         */
        self.logOut = function() {

            var promise = Api.user.logout().$promise;

            return promise;

        };

        /**
         * Restart the Cliche
         *
         * @returns {object} $promise
         */
        self.restart = function() {

            var promise = Api.user.restart().$promise;

            return promise;

        };

        /**
         * Get the token of the user
         *
         * @returns {object} $promise
         */
        self.getToken = function() {

            var promise = Api.token.get().$promise;

            return promise;
        };

        /**
         * Generate the token for the user
         *
         * @returns {object} $promise
         */
        self.generateToken = function() {

            var promise = Api.token.generate().$promise;

            return promise;
        };

        /**
         * Revoke the token of the user
         *
         * @returns {object} $promise
         */
        self.revokeToken = function() {

            var promise = Api.token.revoke().$promise;

            return promise;
        };

        /**
         * Parse the user data
         *
         * @param result
         * @returns {object}
         */
        self.parseUser = function (result) {

            var params = ['avatar_url', 'gravatar_id', 'html_url', 'name'];
            var user = {};

            _.each(params, function (param) {
                if (angular.isDefined(result[param])) {
                    user[param] = result[param];
                }
            });

            return user;
        };

        return self;

    }]);