function AddAccountCtrl($scope, $http, $location, $rootScope, authService, restService) {
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
  $scope.header = "Add Account";
  $scope.roles = ['user', 'admin'];

  $scope.submitAccount = function () {
    restService.post('/account', $scope.form).then(function(data, status, headers, config){
        $location.url('/accountMgmt');
      }, function(data, status, headers, config){
        processError(status, $scope, $http);
    });
  };

  $scope.cancel = function () {
    $location.url('/accountMgmt');
  };
}