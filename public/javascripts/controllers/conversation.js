function ConversationCtrl($scope, $location, $routeParams, $rootScope, $http, authService, restService, socket, $anchorScroll) {
  setupGlobalFunctions(socket, $rootScope, $location);
  checkCredentials(authService, $rootScope, $http);
  
  $scope.discussEntry = 'expanded_discuss';
  $scope.discussionTop = 'discuss114';
  $scope.showProgress = false;

  $rootScope.$on('refreshConversation', function(ev, msg){
    if(msg.chatid === $routeParams.id){
      $scope.lastmodified = msg.added;
      $scope.conversations.push(msg);
      $scope.form = {};
    }
  });

  $scope.addConversation = function () {
    $scope.form.chatid = $routeParams.id;
    $scope.form.email = localStorage.email;
    $scope.form.user = localStorage.username;

    socket.emit('addConversation', $scope.form);

  };

  $scope.getChatSession = function(){
    restService.get('/chatsession', $routeParams.id).then(function(data){
      $scope.title = data.title;
      $scope.added = data.added;
      $scope.lastmodified = data.lastmodified;
      $scope.conversations = data.conversations;
    }, function(status){
      processError(status, $scope, $http);
    });
  };
}