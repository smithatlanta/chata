function ResetPasswordCtrl($scope, $location, $dialog, authService) {
  $scope.submitReset = function(){
    authService.resetPassword($scope.form).then(function(){
      var title = 'Password Reset';
      var msg = "An email was just sent with a link to reset your password.  Please verify that it didn't go to your spam folder if you don't see it in 5 minutes";
      var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

      $dialog.messageBox(title, msg, btns).open().then(function(result){$location.url('/');});
    }, function(err){
      console.log(err);
    });
  };
}