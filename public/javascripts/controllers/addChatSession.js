function AddChatSessionCtrl($scope, $location, $rootScope, $http, socket, authService, restService) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);

  $scope.form = {};
  $scope.type = "Add";
  $scope.isAdd = true;

  $scope.submitChatSession = function () {
    $scope.form.addeduser = localStorage.username;
    $scope.form.email = localStorage.email;

    restService.post('/chatsession', $scope.form).then(function(data){
        $location.url('/conversation/' + data._id);
      }, function(status){
        processError(status, $scope, $http);
      });
  };

  $scope.cancel = function () {
    $location.url('/searchChatSession');
  };
}