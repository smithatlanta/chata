function AccountMgmtCtrl($scope, $http, $location, $routeParams, $modal, $rootScope, authService, restService, socket) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);

  var layoutPlugin = new ngGridLayoutPlugin();
  $scope.gridOptions = { data : 'myData',
    showGroupPanel: false,
    enableCellSelection: false,
    enableRowSelection: false,
    plugins: [ layoutPlugin ],
    columnDefs: [
      {field: 'name', displayName: 'Name', width: '25%'},
      {field: 'username', displayName: 'Username', width: '15%'},
      {field: 'role', displayName: 'Role', width: '10%'},
      {field: 'email', displayName: 'Email', width: '25%'},
      {displayName: 'Options', width: '25%', cellTemplate: '<input type="button" name="edit" ng-click=editAccount(row.entity.id) value="Edit">&nbsp;<input type="button" ng-click=deleteAccount(row.entity.id) name="delete" value="Delete">'}
  ]};

  $scope.myData = [];

  restService.gets('/accounts').then(function(data){
      $scope.myData = data;
      layoutPlugin.updateGridLayout();
    }, function(status){
        processError(status, $scope);
    });

  /* Events */
  $scope.editAccount = function(id){
    $location.url('editAccount/' + id);
  };

  $scope.deleteAccount = function(id){
    var title = 'Delete a User';
    var msg = 'Are you sure you want to delete this user?';
    var btns = [{result:'no', label: 'No'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];

    var modalInstance = $modal.open({
        templateUrl: 'modalAccDel.html',
        controller: ModalAccDelCtrl
    });

    modalInstance.result.then(function (choice) {
      if(choice === 'yes'){
        restService.delete('/account', id).then(function(data){
            $scope.myData = [];

            restService.gets('/accounts').then(function(data){
                $scope.myData = data;
                layoutPlugin.updateGridLayout();
              }, function(status){
                  processError(status, $scope);
              });
          }, function(status){
            processError(status, $scope);
          });
      }
    });
  };
}

var ModalAccDelCtrl = function ($scope, $modalInstance) {
  $scope.yes = function () {
    $modalInstance.close('yes');
  };

  $scope.no = function() {
    $modalInstance.close('no');
  };
};