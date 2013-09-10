function SetPasswordCtrl($scope, $http, $location, $dialog, $routeParams, $rootScope, authService) {
  $scope.submitUpdate = function(){
  	if($scope.form.password === $scope.form.confirmpassword){
			$scope.form.username = $routeParams.username;
	    authService.setPassword($scope.form).then(function(){
	 			$location.url('/');
      }, function(err){
        console.log(err);
        $scope.message = "Please re-enter and confirm your password. There was a difference between them."
	    });
  	}

		$scope.clearMessage = function(){
      $scope.message = "";
    };
  };
}