function SearchChatSessionCtrl($scope, $http, $location, $routeParams, $dialog, $rootScope, typesService, networksService, statesService, restService, authService, $timeout) {
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
  $scope.types = typesService.getTypes();
  $scope.networks = networksService.getNetworks();
  $scope.states = statesService.getStates();
  $scope.tableClass = 'expanded_table';
  $scope.arrow = "icon-white icon-arrow-down";

  $scope.form.neededbydate = null;

  $scope.showWeeks = true;
  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  restService.gets('/accounts/short').then(function(data, status, headers, config){
      $scope.users = data;
    }, function(err){
      processError(status, $scope, $http);
    });

  var layoutPlugin = new ngGridLayoutPlugin();

  $scope.form.title = $routeParams.title;
  search($scope, $http, restService, layoutPlugin);

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
    var msg = 'Are you sure you want to delete this review?';
    var btns = [{result:'no', label: 'No'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}];

    $dialog.messageBox(title, msg, btns)
      .open()
      .then(function(result){
        if(result === 'yes'){
          restService.delete('/chatsession', id).then(function(data, status, headers, config){
              search($scope, $http, restService, layoutPlugin);
            }, function(err){
              processError(err, $scope, $http);
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
    search($scope, $http, restService, layoutPlugin);
  };

  $scope.keypress = function(key){
    search($scope, $http, restService, layoutPlugin);
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

function search(scope, http, restService, layoutPlugin){
  scope.myData = [];

  if(scope.form.neededbydate !== null){

  }
  else{
    delete scope.form.neededbydate;
  }

  restService.post('/search', JSON.stringify(scope.form)).then(function(data, status, headers, config){
      scope.myData = data;
      layoutPlugin.updateGridLayout();
    }, function(err){
      processError(err, scope, http);
    });
}

