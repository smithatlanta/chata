var siteProvider = require('../models/siteProvider').siteProvider;
var siteProvider = new siteProvider();
var moment = require('moment');
var global = require('../app/global')

config = require('../config/config');

global.io.sockets.on('connection', function (socket) {
  socket.on('addConversation', function(data){
    siteProvider.addConversation(data, function(conver){
      conver.id = data.id;
      global.io.sockets.emit('refreshConversation', conver);
    });
  });
});

exports.index = function(req, res){
	res.sendfile('./public/index.html');
};

exports.searchChatSessions =  function(req, res){
	siteProvider.searchChatSessions(req.body, function(docs){
		var out = [];
		if(docs === undefined){
			res.json(out);
			return;
		}

		for(var x=0; x< docs.length;x++)
		{
			var chatsession = {};
			chatsession.title = docs[x].title;
			chatsession.added = docs[x].added;
			chatsession.addeduser = docs[x].addeduser;
			chatsession.lastmodified = docs[x].lastmodified;
			chatsession.lastmodifieduser = docs[x].lastmodifieduser;
			chatsession.id = docs[x]._id;

			out.push(chatsession);
		}
		res.json(out);
	});
};

exports.getChatSession = function(req, res){
	siteProvider.getChatSession(req.params.id, function(doc){
		res.json(doc);
	});
};

exports.getChatSessions = function(req, res){
	siteProvider.getChatSessions(function(docs){
		var out = [];
		if(docs === undefined){
			res.json(out);
			return;
		}

		for(var x=0; x< docs.length;x++)
		{
			var chatsession = {};
			chatsession.title = docs[x].title;
			chatsession.added = moment(docs[x].added).utc().format('L');
			chatsession.addeduser = docs[x].addeduser;
			chatsession.id = docs[x]._id;

			out.push(review);
		}
		res.json(out);
	});
};

exports.addChatSession = function(req, res){
	siteProvider.addChatSession(req.body, function(doc){
		res.send(doc);
	});
};

exports.updateChatSession = function(req, res){
	siteProvider.updateChatSession(req.body, function(doc){
		res.json(doc);
	});
};

exports.deleteChatSession = function(req, res){
	siteProvider.deleteChatSession(req.params.id, function(success){
		res.json(success);
	});
}

exports.addConversation = function(req, res){
	siteProvider.addConversation(formPart.id, conver, function(doc){
		res.send(doc);   	
	});
};