function AccountMgmtCtrl($scope, $http, $location, $routeParams, $dialog, $rootScope, authService, restService) {
  localStorage.location = $location.url();
  /* setup session timeout popup to login */
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
    });

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

  restService.gets('/accounts').then(function(data, status, headers, config){
      $scope.myData = data;
      layoutPlugin.updateGridLayout();
    }, function(data, status, headers, config){
        processError(status, $scope, $http);
    });

  /* Events */
  $scope.editAccount = function(id){
    $location.url('editAccount/' + id);
  };

  $scope.deleteAccount = function(id){
    var title = 'Delete a User';
    var msg = 'Are you sure you want to delete this user?';
    var btns = [{result:'no', label: 'No'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];

    $dialog.messageBox(title, msg, btns)
      .open()
      .then(function(result){
        if(result === 'yes'){
          restService.delete('/account', id).then(function(data, status, headers, config){
              $scope.myData = [];

              restService.gets('/accounts').then(function(data, status, headers, config){
                  $scope.myData = data;
                  layoutPlugin.updateGridLayout();
                }, function(data, status, headers, config){
                    processError(status, $scope, $http);
                });
            }, function(data, status, headers, config){
              processError(status, $scope, $http);
            });
        }
      });
  };
}