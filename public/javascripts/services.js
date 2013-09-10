angular.module('myApp.services', []).
  service('typesService', function() {
      this.getTypes = function() {
          return ['Game', 'Video', 'Image and Text'];
      };
  }).
  service('networksService', function() {
      this.getNetworks = function() {
          return ['TBS', 'TNT', 'CTN'];
      };
  }).
  service('statesService', function() {
      this.getStates = function() {
          return ['New', 'EditRequest', 'Approved'];
      };
  }).
  service('authService', ['$http', '$q', function($http, $q){
    this.checkCreds = function() {
      var deferred = $q.defer();

      $http.defaults.headers.get = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session };
      $http.get('/auth').
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;
    };
    this.resetPassword = function(username) {
      var deferred = $q.defer();

      $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.post('/account/resetpassword', username).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });
      
      return deferred.promise;        
    };
    this.setPassword = function(jsonData) {
      var deferred = $q.defer();

      $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.post('/account/setpassword', jsonData).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;
    };
  }]).
  service('restService', ['$http', '$q', function($http, $q, $routeParams){
    this.gets = function(route) {
      var deferred = $q.defer();
      
      $http.defaults.headers.get = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.get(route).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;        
    };
    this.get = function(route, id) {
      var deferred = $q.defer();
      
      $http.defaults.headers.get = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.get(route + "/" + id).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;        
    };
    this.delete = function(route, id) {
      var deferred = $q.defer();

      $http.defaults.headers.delete = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session };
      $http.delete(route + "/" + id).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;        
    };
    this.post = function(route, jsonData) {
      var deferred = $q.defer();

      $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.post(route, jsonData).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });
      
      return deferred.promise;
    };
    this.put = function(route, jsonData) {
      var deferred = $q.defer();
      
      $http.defaults.headers.put = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };
      $http.put(route, jsonData).
        success(function(data, status, headers, config) {
          deferred.resolve(data, status, headers, config);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data, status, headers, config);
        });

      return deferred.promise;        
    };
  }]);