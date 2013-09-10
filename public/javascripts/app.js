angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'btford.socket-io', 'ui.bootstrap.tpls', 'ui.bootstrap.buttons', 'ui.bootstrap.datepicker', 'ui.bootstrap.modal', 'ui.bootstrap.dialog', 'ui.bootstrap.dropdownToggle', 'ui.bootstrap.collapse', 'ui.bootstrap.timepicker', 'ngGrid', 'md5', 'ui.keypress']).
  config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/index.html',
        controller: IndexCtrl
      }).
      when('/addChatSession', {
        templateUrl: '/partials/addEditChatSession.html',
        controller: AddChatSessionCtrl
      }).
      when('/editChatSession/:id', {
        templateUrl: '/partials/addEditChatSession.html',
        controller: EditChatSessionCtrl
      }).
      when('/conversation/:id', {
        templateUrl: '/partials/conversation.html',
        controller: ConversationCtrl
      }).
      when('/searchChatSession', {
        templateUrl: '/partials/searchChatSession.html',
        controller: SearchChatSessionCtrl
      }).
      when('/accountMgmt', {
        templateUrl: '/partials/accountMgmt.html',
        controller: AccountMgmtCtrl
      }).
      when('/addAccount', {
        templateUrl: '/partials/addEditAccount.html',
        controller: AddAccountCtrl
      }).
      when('/editAccount/:id', {
        templateUrl: '/partials/addEditAccount.html',
        controller: EditAccountCtrl
      }).
      when('/resetpassword', {
        templateUrl: '/partials/resetPassword.html',
        controller: ResetPasswordCtrl
      }).
      when('/register', {
        templateUrl: '/partials/register.html',
        controller: RegisterCtrl
      }).

      when('/setpassword', {
        templateUrl: '/partials/setPassword.html',
        controller: SetPasswordCtrl
      }).
      otherwise({
        templateUrl: '/partials/404.html'
      });
    $locationProvider.html5Mode(true);
  }]);