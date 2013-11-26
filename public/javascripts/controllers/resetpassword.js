function ResetPasswordCtrl($scope, $location, $modal, authService) {
  $scope.submitReset = function(){
    authService.resetPassword($scope.form).then(function(){
    });

    var modalInstance = $modal.open({
        templateUrl: 'modalReset.html',
        controller: ModalResetCtrl
    });

    modalInstance.result.then(function () {
    }, function () {
      $location.url('/');
    });
  };
}

var ModalResetCtrl = function ($scope, $modalInstance) {
  $scope.close = function() {
    $modalInstance.dismiss('close');
  };
};