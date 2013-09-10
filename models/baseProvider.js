config = require('../config/config');
var mongoose = require('mongoose');
var settings = config.DatabaseConfig;

var ctr = 0;
mongoose.connect('mongodb://' + settings.user + ':' + settings.pass + '@' + settings.host + ':' + settings.port + '/' + settings.name);

mongoose.connection.on('close', function(stream){
	console.log("Connection was closed");
});

mongoose.connection.on('reconnected', function(stream){
	console.log("Connection was reconnected");
});

mongoose.connection.on('disconnected', function(stream){
	console.log("Connection was disconnected");
});

mongoose.connection.on('error', function(stream){
	console.log("Error occurred when trying to connect");
	throw stream;
});

baseProvider = function(){};

exports.baseProvider=baseProvider;