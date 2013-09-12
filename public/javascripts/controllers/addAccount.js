function AddAccountCtrl($scope, $location, $rootScope, restService) {
  setupLogin($scope, restService);
  setupSearch($rootScope, $location);

  $scope.form = {};
  $scope.header = "Add Account";
  $scope.roles = ['user', 'admin'];

  $scope.submitAccount = function () {
    restService.post('/account', $scope.form).then(function(data){
        if($rootScope.loggedInAdmin){
          $location.url('/accountMgmt');
        }
        else
        {
          $location.url('/');
        }
      }, function(status){
        processError($scope, status);
    });
  };

  $scope.cancel = function () {
    if($rootScope.loggedInAdmin){
      $location.url('/accountMgmt');
    }
    else
    {
      $location.url('/');
    }
  };
}