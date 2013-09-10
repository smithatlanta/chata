function processError(status, scope, http){
	if(status === 401){
		scope.shouldBeOpen = true;
	}
  else
  {
    // need to log these somewhere since they were unexpected and pop up some friendly dialog to try again
    console.log('An error occurred: ' + status);
  }
}

function setupSearch(rootScope, location){
  rootScope.keypress = function(key){
    location.url('/searchChatSession?title=' + rootScope.title);
    rootScope.title = "";
  };
}

function setupLogin(scope, http){
  scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

  scope.close = function () {
    scope.shouldBeOpen = false;
  };

  scope.submitLogin = function () {
    if(scope.form === undefined){
      scope.message = "Please enter a username and password";
      return;
    }

    if(scope.form.password === undefined){
      scope.message = "Please enter a password";
      return;
    }

    localStorage.clear();

    localStorage.username = scope.form.username;
    localStorage.password = scope.form.password;

    http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password};

    http.post('/signin', scope.form).
      success(function(data, status, headers, config) {
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.session = data.session;
        scope.shouldBeOpen = false;
      }).
      error(function(data, status, headers, config){
        scope.message = "Incorrect username or password. Please try again.";
      });
  };
}
