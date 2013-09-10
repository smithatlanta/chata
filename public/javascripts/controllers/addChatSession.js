function AddChatSessionCtrl($scope, $http, $location, $rootScope, typesService, networksService, authService, restService, $timeout, socket) {
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

  $scope.type = "Add";
  $scope.isAdd = true;


  $scope.submitChatSession = function () {
    $scope.form.addeduser = localStorage.username;
    $scope.form.email = localStorage.email;    

    restService.post('/chatsession', $scope.form).then(function(data, status, headers, config){
        $location.url('/conversation/' + data._id);
      }, function(err){
        processError(err, $scope, $http);
      });
  };

  $scope.cancel = function () {
    $location.url('/searchChatSession');
  };
}