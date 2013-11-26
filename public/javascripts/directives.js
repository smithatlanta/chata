angular.module('myApp.directives', ['md5']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('resize', function ($window) {
    return function (scope, element) {
      scope.getWinHeight = function() {
        var heightDeduct;

        // > 895
        if($window.innerWidth >= 885){
          scope.discussionTop = 'discuss114';
          heightDeduct = 160;
        }

        if($window.innerWidth >= 744 && $window.innerWidth < 885){
          scope.discussionTop = 'discuss135';
          heightDeduct = 181;
        }

        if($window.innerWidth >=  590 && $window.innerWidth < 744){
          scope.discussionTop = 'discuss156';
          heightDeduct = 202;
        }

        if($window.innerWidth >=  400 && $window.innerWidth < 590){
          scope.discussionTop = 'discuss177';
          heightDeduct = 223;
        }

        if($window.innerWidth <  400){
          scope.discussionTop = 'discuss198';
          heightDeduct = 244;
        }
        
        setNavHeight($window.innerHeight - heightDeduct);
        return $window.innerHeight;
      };

      var setNavHeight = function(newHeight) {
        element.css('height', newHeight + 'px');
      };

      // Set on load
      scope.$watch(scope.getWinHeight, function (newValue, oldValue) {
        setNavHeight(scope.getWinHeight() - 310);
      }, true);

      // Set on resize
      angular.element($window).bind('resize', function () {
        scope.$apply();
        return false;
      });
    };
  }).
  directive('adjustbubbles', ['md5', '$location', '$anchorScroll', '$window', function(md5, location, anchorScroll, window) {
    return {
      restrict: 'EA',
      scope: true,
      link:function (scope, elm, attrs) {
          // by default the values will come in as undefined so we need to setup a
          // watch to notify us when the value changes
          scope.$watch(attrs.email, function () {
            // convert the value to lower case and then to a md5 hash
            var hash = md5.createHash(attrs.email.toLowerCase());
            // parse the size attribute
            var size = attrs.size;
            // default to 40 pixels if not set
            if((size=== null) || (size === undefined) || (size === '')){
                size = 40;
            }
            // parse the ratings attribute
            var rating = attrs.rating;
            // default to pg if not set
            if((rating === null) || (rating === undefined)|| (rating === '')){
                rating = 'pg';
            }
            // parse the default image url
            var defaultUrl = attrs.default;
            if((defaultUrl === null) || (defaultUrl === undefined)|| (defaultUrl === '')) {
                defaultUrl = '404';
            }

            var tag;
            if(localStorage.lastemail !== attrs.email)
            {
              if(localStorage.bubbleside === "left"){
                localStorage.bubbleside = "right";
              }
              else
              {
                localStorage.bubbleside = "left";
              }
            }

            // first one is always on
            if(attrs.index === "0"){
              localStorage.bubbleside = "left";
              if(attrs.filename){
                tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></img></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td><td class="bubblerow"><div class="bubble me">' + attrs.detail + '<br/><a target="_self" href="/asset/' + attrs.id + '" >attachment</a></div></td></tr></table>';
              }
              else{
                tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td><td class="bubblerow"><div class="bubble me">' + attrs.detail + '</div></td></tr></table>';
              }
            }
            else{
              if(localStorage.bubbleside === "left"){
                if(attrs.filename){
                  tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td><td class="bubblerow"><div class="bubble me">' + attrs.detail + '<br/><a target="_self" href="/asset/' + attrs.id + '" >attachment</a></div></td></tr></table>';
                }
                else{
                  tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td><td class="bubblerow"><div class="bubble me">' + attrs.detail + '</div></td></tr></table>';
                }
              }
              else
              {
                if(attrs.filename){
                  tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td class="bubblerow"><div class="bubble you">' + attrs.detail + '<br/><a target="_self" href="/asset/' + attrs.id + '" >attachment</a></div></td><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td></tr></table>';
                }
                else{
                  tag = '<table style="width:100%"><tr><td style="text-align:center"><span class="gravtext">' + attrs.added + '</span></td></tr></table><table style="width:100%"><tr><td class="bubblerow"><div class="bubble you">' + attrs.detail + '</div></td><td><table style="width:100%"><tr><td class="gravatar center"><img class="gravatar-icon" src="https://secure.gravatar.com/avatar/' + hash + '?s=50&r=pg&d=mm"></td></tr><tr><td class="gravtext"><span>' + attrs.user +'</span></td></tr></table></td></tr></table>';
                }
              }
            }
            
            localStorage.lastemail = attrs.email;
            
            elm.append(tag);

            location.hash('test');
            anchorScroll();
          });
        }
    };
  }]);
//////Functions that need a better home
function setupGlobalFunctions(socket, rootScope, location){
  rootScope.prevreferrer = rootScope.referrer;
  rootScope.referrer = location.url();

  rootScope.updatectr = localStorage.updatectr;

  if(rootScope.setup === undefined){
    rootScope.$on('LocalStorageChanged', function(){
        rootScope.updatectr = localStorage.updatectr;
      });

    rootScope.setup = true;

    socket.addListener('refreshConversation', function(data){
      rootScope.$broadcast('refreshConversation', data);
    });

    rootScope.loadMyQueue = function(){
      location.url('searchChatSession');
    };

    rootScope.signOut = function(){
      if(localStorage.password){
        localStorage.removeItem("password");
      }
      if(localStorage.session){
        localStorage.removeItem("session");
      }
      if(localStorage.name){
        localStorage.removeItem("name");
      }
      if(localStorage.email){
        localStorage.removeItem("email");
      }
      if(localStorage.id){
        localStorage.removeItem("id");
      }

      rootScope.loggedIn = false;
      rootScope.loggedInAdmin = false;

      location.url('/');
    };

    rootScope.keypress = function(key){
      location.url('searchChatSession?referrer=navbar&title=' + rootScope.title);
      rootScope.title = "";
    };
  }
}

function checkCredentials(authService, rootScope, http){
  /* authenticate */
  authService.checkCreds().then(function(data){
      rootScope.welcome = "Welcome: " + localStorage.name ;
      rootScope.loggedInAdmin = data.show;
      rootScope.loggedIn = true;
      rootScope.id = data.id;
    }, function(status){
      rootScope.loggedInAdmin = false;
      rootScope.loggedIn = false;
      processError(status, rootScope);
    });
}

function processError(status, $modal){
  if(status === 401){
    $modal.open({
        templateUrl: 'modalLogin.html',
        controller: ModalLoginInstCtrl
    });
  }
  else
  {
    // need to log these somewhere since they were unexpected and pop up some friendly dialog to try again
    console.log('An error occurred: ' + $status);
  }
}

var ModalLoginInstCtrl = function ($scope, $modalInstance, $http, $location) {
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.submitLogin = function () {
    if($scope.form === undefined){
      $scope.message = "Please enter a username and password";
      return;
    }

    if($scope.form.password === undefined){
      $scope.message = "Please enter a password";
      return;
    }

    localStorage.clear();

    localStorage.username = $scope.form.username;
    localStorage.password = $scope.form.password;

    $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password};

    $http.post('/signin', $scope.form).
      success(function(data, status, headers, config) {
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.session = data.session;
        $modalInstance.dismiss('cancel');
      }).
      error(function(data, status, headers, config){
        $scope.message = "Incorrect username or password. Please try again.";
      });
  };
};