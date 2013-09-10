function RegisterCtrl($scope, $http, $location, $rootScope, authService, restService) {
  $scope.form = {};

  $scope.submitAccount = function () {
    restService.post('/account', $scope.form).then(function(data, status, headers, config){
        $location.url('/');
      }, function(data, status, headers, config){
        processError(status, $scope, $http);
    });
  };

  $scope.cancel = function () {
    $location.url('/');
  };
}