function IndexCtrl($scope, $http, $location, $rootScope, $routeParams, restService) {
  if(localStorage.password){
    localStorage.removeItem("password");
  }
  if(localStorage.session){
    localStorage.removeItem("session");
  }
  if(localStorage.name){
    localStorage.removeItem("name");
  }
  if(localStorage.email){
    localStorage.removeItem("email");
  }

  if(localStorage.username){
    $scope.form = {};
    $scope.form.username = localStorage.username;
  }

  $rootScope.loggedIn = false;
  $rootScope.loggedInAdmin = false;

  $scope.submitLogin = function () {
    if($scope.form === undefined){
      $scope.message = "Please enter a username and password";
      return;
    }

    if($scope.form.password === undefined){
      $scope.message = "Please enter a password";
      return;
    }

    localStorage.username = $scope.form.username;
    localStorage.password = $scope.form.password;

    restService.post('/signin', $scope.form).then(function(data, status, headers, config){
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.session = data.session;
        localStorage.name = data.name;
        localStorage.email = data.email;
        if(localStorage.location){
          $location.url(localStorage.location);
        }
        else{
         $location.url('/addChatSession');
        }
      }, function(data, status, headers, config){
        localStorage.clear();
        $scope.message = "Incorrect username or password. Please try again.";
      });

    $scope.clearMessage = function(){
      $scope.message = "";
    };
  }
}