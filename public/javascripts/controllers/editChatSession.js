function EditChatSessionCtrl($scope, $http, $location, $routeParams, $rootScope, typesService, networksService, restService, authService, $timeout) {
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
  $scope.type = "Save";
  
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = true;
  
  $scope.showWeeks = true;
  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };

  $scope.types = typesService.getTypes();
  $scope.networks = networksService.getNetworks();
  $scope.isAdd = false;

  restService.get('/chatsession', $routeParams.id).then(function(data, status, headers, config){
      data.neededbydate = data.neededbydatetime;
      $scope.form = data;
      var tmpDate = new Date(data.neededbydatetime);
      $scope.form.neededbytime = tmpDate;
    }, function(err){
      processError(err, $scope, $http);
    });

  $scope.submitChatSession = function () {
    $scope.form.email = localStorage.email;

    var dt = new Date($scope.form.neededbydate);
    var tm = new Date($scope.form.neededbytime);

    $scope.form.neededbydatetime = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), tm.getHours(), tm.getMinutes(), 0, 0);

    restService.put('/chatsession', JSON.stringify($scope.form)).then(function(data, status, headers, config){
        $location.url('/searchChatSession?title=' + data.title);
      }, function(err) {
        processError(err, $scope, $http);
    });
  };

  $scope.cancel = function () {
    $location.url('/searchChatSession?title=' + $scope.form.title);
  };
}