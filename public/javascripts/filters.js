angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('moment', function () {
		return function (dateString, format) {
			if(dateString === undefined)
			{
				return "";
			}
			
			return moment(dateString).format(format);		
		};
	});