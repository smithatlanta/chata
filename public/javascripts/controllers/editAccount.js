function EditAccountCtrl($scope, $location, $routeParams, $rootScope, $http, authService, socket, restService, md5) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);

  $scope.hash = md5.createHash(localStorage.email.toLowerCase());

  $scope.form = {};
  $scope.header = "Edit Account";
  $scope.roles = ['user', 'admin'];

  restService.get('/account', $routeParams.id).then(function(data){
      $scope.form = data;
      $scope.form.password = "";
    }, function(status){
      processError(status, $scope, $http);
    });

  $scope.submitAccount = function () {
    restService.put('/account', $scope.form).then(function(data){
        if($rootScope.loggedInAdmin){
          $location.url('/accountMgmt');
        }
        else
        {
          $location.url('searchChatSession/');
        }
      }, function(status){
        processError(status, $scope, $http);
      });
  };

  $scope.cancel = function () {
    if($rootScope.loggedInAdmin){
      $location.url('/accountMgmt');
    }
    else
    {
      $location.url('searchChatSession/');
    }
  };
}