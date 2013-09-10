function ConversationCtrl($scope, $http, $location, $routeParams, $rootScope, restService, authService, socket, $anchorScroll) {
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

  socket.addListener('refreshConversation', function(conver){
    if(conver.id === $routeParams.id){

      $scope.lastmodified = conver.added;
      $scope.conversations.push(conver);
      $scope.form = {};
    }
  })
  
  $scope.arrow = "icon-white icon-arrow-down";
  $scope.discussEntry = 'expanded_discuss';  
  $scope.discussionTop = 'discuss114'
  $scope.showProgress = false;  

  $scope.toggleCrit = function(){
    $scope.isCollapsed = !$scope.isCollapsed;
    if($scope.isCollapsed === true){
      $scope.discussEntry = 'collapsed_discuss';
      $scope.arrow = "icon-white icon-arrow-up";
    }
    else{
      $scope.discussEntry = 'expanded_discuss';
      $scope.arrow = "icon-white icon-arrow-down";
    }
  };

  $scope.addConversation = function () {
    $scope.form.id = $routeParams.id;
    $scope.form.email = localStorage.email;
    $scope.form.user = localStorage.username;

    socket.emit('addConversation', $scope.form);

  };

  $scope.getChatSession = function(){
    restService.get('/chatsession', $routeParams.id).then(function(review){
      $scope.title = review.title;
      $scope.currentstate = review.currentstate;
      $scope.added = review.added;
      $scope.neededbydatetime = review.neededbydatetime;
      $scope.lastmodified = review.lastmodified;      
      $scope.conversations = review.conversations;
    }, function(err){
      console.log(err);
    });
  }
}