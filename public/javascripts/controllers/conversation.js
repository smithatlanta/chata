function ConversationCtrl($scope, $location, $routeParams, $rootScope, restService, socket, $anchorScroll) {
  setupLogin($scope, restService);
  setupSearch($rootScope, $location);
  checkCredentials($rootScope, restService);

  socket.addListener('refreshConversation', function(data){
    if(data.chatid === $routeParams.id){

      $scope.lastmodified = data.added;
      $scope.conversations.push(data);
      $scope.form = {};
    }
  });
  
  $scope.discussEntry = 'expanded_discuss';
  $scope.discussionTop = 'discuss114';
  $scope.showProgress = false;

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