angular.module('myApp.directives', ['md5']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  // Resizing a div with AngularJS in a very rough way
  directive('resize', function ($window) {
    return function (scope, element) {
      scope.getWinHeight = function() {
        var heightDeduct;

        if($window.innerWidth >= 885){
          scope.discussionTop = 'discuss114';

          if(scope.isCollapsed === true){
            heightDeduct = 160;
          }
          else
          {
            heightDeduct = 310;
          }
        }

        if($window.innerWidth >= 744 && $window.innerWidth < 885){
          scope.discussionTop = 'discuss135';
          if(scope.isCollapsed === true){
            heightDeduct = 181;
          }
          else
          {
            heightDeduct = 331;
          }
        }

        if($window.innerWidth >=  590 && $window.innerWidth < 744){
          scope.discussionTop = 'discuss156';
          if(scope.isCollapsed === true){
            heightDeduct = 202;
          }
          else
          {
            heightDeduct = 352;
          }
        }

        // 506
        if($window.innerWidth >=  400 && $window.innerWidth < 590){
          scope.discussionTop = 'discuss177';
          if(scope.isCollapsed === true){
            heightDeduct = 223;
          }
          else
          {
            heightDeduct = 373;
          }
        }

        // < 506
        if($window.innerWidth <  400){
          scope.discussionTop = 'discuss198';
          if(scope.isCollapsed === true){
            heightDeduct = 244;
          }
          else
          {
            heightDeduct = 394;
          }
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