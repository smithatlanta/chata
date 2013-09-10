function EditAccountCtrl($scope, $http, $location, $routeParams, $rootScope, authService, restService) {
  localStorage.location = $location.url();
  setupLogin($scope, $http);
  setupSearch($rootScope, $location);

  /* authenticate */
  authService.checkCreds().then(function(data, status, headers, config){
      $rootScope.welcome = "Welcome: " + localStorage.name + " |" ;
      $rootScope.loggedInAdmin = data.show;
      $rootScope.loggedIn = true;
    }, function(data, status, headers, config){
      $rootScope.loggedInAdmin = false;
      $rootScope.loggedIn = false;
    })

  $scope.form = {};
  $scope.header = "Edit Account";
  $scope.roles = ['user', 'admin'];

  restService.get('/account', $routeParams.id).then(function(data, status, headers, config){
      $scope.form = data;
      $scope.form.password = "";
    }, function(err){
      processError(err, $scope, $http);
    });

  $scope.submitAccount = function () {
    restService.put('/account', $scope.form).then(function(data, status, headers, config){
        $location.url('/accountMgmt');
      }, function(err){
        processError(err, $scope, $http);
      });
  };

  $scope.cancel = function () {
    $location.url('/accountMgmt');
  };
}