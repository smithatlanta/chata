function IndexCtrl($scope, $location, $rootScope, restService) {
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
  if(localStorage.id){
    localStorage.removeItem("id");
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

    restService.post('/signin', $scope.form).then(function(data){
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.session = data.session;
        localStorage.name = data.name;
        localStorage.email = data.email;
        localStorage.id = data.id;
        $location.url('addChatSession/');
      }, function(status){
        localStorage.clear();
        $scope.message = "Incorrect username or password. Please try again.";
      });

    $scope.clearMessage = function(){
      $scope.message = "";
    };
  };
}