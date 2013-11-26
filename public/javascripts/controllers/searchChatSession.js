function SearchChatSessionCtrl($scope, $location, $routeParams, $modal, $http, $timeout, socket, authService, $rootScope, restService) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);

  $scope.form = {};
  $scope.tableClass = 'expanded_table';
  $scope.arrow = "icon-white icon-arrow-down";

  $scope.form.neededbydate = null;

  $scope.showWeeks = true;
  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  restService.gets('/accounts/short').then(function(data){
      $scope.users = data;
    }, function(status){
      processError(status, $scope, $http);
    });

  var layoutPlugin = new ngGridLayoutPlugin();
  if($routeParams.title !== undefined){
    $scope.form.title = $routeParams.title;
    search($scope, restService, layoutPlugin);
  }

  $scope.gridOptions = { data : 'myData',
    showGroupPanel: true,
    enableCellSelection: false,
    enableRowSelection: false,
    plugins: [ layoutPlugin ],
    columnDefs: [{field: 'title', displayName: 'Title', width: '25%'},
      {field: 'added', displayName: 'Added', width: '15%', cellFilter: "moment:'M/D/YYYY h:mm A'"},
      {field: 'addeduser', displayName: 'Added User', width: '10%'},
      {field: 'lastmodified', displayName: 'Modifed', width: '15%', cellFilter: "moment:'M/D/YYYY h:mm A'"},
      {field: 'lastmodifieduser', displayName: 'Modified User', width: '10%'},
      {width: '25%', displayName: 'Options', cellTemplate: '<input type="button" name="edit" ng-click=editChatSession(row.entity.id) value="Edit">&nbsp;<input type="button" ng-click=deleteChatSession(row.entity.id) name="delete" value="Delete">&nbsp;<input type="button" ng-click=viewChatSession(row.entity.id) name="view" value="View">'}
  ]};

  $scope.toggleCrit = function(){
    $scope.isCollapsed = !$scope.isCollapsed;
    if($scope.isCollapsed === true){
      $scope.tableClass = 'collapsed_table';
      $scope.arrow = "icon-white icon-arrow-down";
    }
    else{
      $scope.tableClass = 'expanded_table';
      $scope.arrow = "icon-white icon-arrow-up";
    }
  };

  $scope.editChatSession = function(id){
    $location.url('editChatSession/' + id);
  };

  $scope.deleteChatSession = function(id){
    var title = 'Delete ChatSession';
    var msg = 'Are you sure you want to delete this session?';
    var btns = [{result:'no', label: 'No'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];

    var modalInstance = $modal.open({
        templateUrl: 'modalChatDel.html',
        controller: ModalChatDelCtrl
    });

    modalInstance.result.then(function (choice) {
      if(choice === 'yes'){
          restService.delete('/chatsession', id).then(function(data){
              search($scope, restService, layoutPlugin);
            }, function(status){
              processError(status, $scope);
            });
      }
    });
  };

  $scope.viewChatSession = function(id){
    $location.url('conversation/' + id);
  };

  $scope.reset = function(){
    $scope.form = {};
    $scope.myData = [];
    layoutPlugin.updateGridLayout();
  };

  $scope.search = function(){
    search($scope, restService, layoutPlugin);
  };

  $scope.keypress = function(key){
    search($scope, restService, layoutPlugin);
  };

  $scope.openstart = function() {
    $timeout(function() {
      $scope.openedstart = true;
    });
  };
  $scope.openend = function() {
    $timeout(function() {
      $scope.openedend = true;
    });
  };
  $scope.openneeded = function() {
    $timeout(function() {
      $scope.openedneeded = true;
    });
  };
}

function search(scope, restService, layoutPlugin){
  scope.myData = [];

  if(scope.form.neededbydate !== null){

  }
  else{
    delete scope.form.neededbydate;
  }

  restService.post('/chatsession/search', JSON.stringify(scope.form)).then(function(data){
      scope.myData = data;
      layoutPlugin.updateGridLayout();
    }, function(status){
      processError(scope, status);
    });
}

var ModalChatDelCtrl = function ($scope, $modalInstance) {
  $scope.yes = function () {
    $modalInstance.close('yes');
  };

  $scope.no = function() {
    $modalInstance.close('no');
  };
};