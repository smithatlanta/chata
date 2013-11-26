function EditChatSessionCtrl($scope, $location, $routeParams, $rootScope, $http, socket, authService, restService) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);

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

  $scope.isAdd = false;

  restService.get('/chatsession', $routeParams.id).then(function(data){
      data.neededbydate = data.neededbydatetime;
      $scope.form = data;
      var tmpDate = new Date(data.neededbydatetime);
      $scope.form.neededbytime = tmpDate;
    }, function(status){
      processError(status, $scope, $http);
    });

  $scope.submitChatSession = function () {
    $scope.form.email = localStorage.email;

    var dt = new Date($scope.form.neededbydate);
    var tm = new Date($scope.form.neededbytime);

    $scope.form.neededbydatetime = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), tm.getHours(), tm.getMinutes(), 0, 0);

    restService.put('/chatsession', JSON.stringify($scope.form)).then(function(data){
        $location.url('/searchChatSession?title=' + data.title);
      }, function(status) {
        processError(status, $scope, $http);
    });
  };

  $scope.cancel = function () {
    $location.url('/searchChatSession?title=' + $scope.form.title);
  };
}