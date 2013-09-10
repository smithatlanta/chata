var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Conversation = new Schema({
	detail: String,
	added: Date,
	user: String,
	email: String,
});

var ChatSession = new Schema({
	title: String,
	added: Date,
	addeduser: String,
	conversations: [Conversation],
	lastmodified: Date,
	lastmodifieduser: String
});

mongoose.model('ChatSession', ChatSession, 'chatsession');

var ChatSession = mongoose.model('ChatSession');

siteProvider = function(){};

siteProvider.prototype.searchChatSessions = function(qry, callback){
	var query = ChatSession.find({}).sort({title: 'asc'});

	var hasQueryString = false;
	if(qry.title !== "" && qry.title !== undefined){
		hasQueryString = true;
		var pattern = new RegExp(qry.title, "i");
		query.regex('title', pattern);
	}
	if(qry.addedstart !== "" && qry.addedstart !== undefined && qry.addedend !== "" && qry.addedend !== undefined){
		hasQueryString = true;
		query.where('added').gte(qry.addedstart).lte(qry.addedend);
	}
	if(qry.addeduser !== "" && qry.addeduser !== undefined){
		hasQueryString = true;
		query.where('addeduser', qry.addeduser);
	}
	if(qry.detail !== "" && qry.detail !== undefined){
		hasQueryString = true;
		// determine if AND or OR exist
		// if either exist then build up array
		if(qry.detail.indexOf("AND") === -1 && qry.detail.indexOf("OR") === -1){
			var pattern = new RegExp(qry.detail, "i");
			query.regex('conversations.detail', pattern);
		}
		else{
			var arr = [];
			arr = buildExpressionArrayDetail(qry.detail);
			if(isAndExpression(qry.detail)){
				query.and(arr);
			}
			else{
				query.or(arr);
			}
		}
	}

	if(hasQueryString) {
		query.exec(function(err, reviews){
			if (err) {
	          console.log(err);
	          throw err;
	        }

			callback(reviews);
		});
	}
	else{
		callback();
	}
};


siteProvider.prototype.getChatSessions = function(callback){
	ChatSession.find(function(err, reviews) {
	  if (err) {
	    console.log(err);
	    throw err;
	  }

		callback(reviews);
	});
};

siteProvider.prototype.getChatSession = function(id, callback){
	ChatSession.findById(id, function(err, review) {
    if (err) {
      console.log(err);
      throw err;
    }

		callback(review);
	});
};

siteProvider.prototype.addChatSession = function(chatsession, callback){
	var doc = new ChatSession();

	doc.title = chatsession.title;
	doc.added = new Date();
	doc.addeduser = chatsession.addeduser;

	doc.conversations = [];

	doc.save(function(err) {
    if (err) {
      console.log(err);
      throw err;
    }
	});

	callback(doc);
};

siteProvider.prototype.updateChatSession = function(chatsession, callback){
	ChatSession.findById(chatsession._id, function(err, doc) {
		if (err) {
			console.log(err);
			throw err;
		}
	
		doc.title = chatsession.title;
		doc.lastmodified = new Date();
		doc.lastmodifieduser = chatsession.user		

		doc.save(function(err) {
			if (err) {
				console.log(err);
				throw err;
			}
		});
		callback(doc);
	});
};

siteProvider.prototype.deleteChatSession = function(id, callback){
	ChatSession.remove({_id: id}, function(err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
	callback("true");
};

siteProvider.prototype.getConversation = function(id, callback){
	ChatSession.find({"conversations._id": id}, {'_id': 0, 'conversations.$':1}, function(err, conversation) {
    if (err) {
      console.log(err);
      throw err;
    }

		callback(conversation);
	});	
}

siteProvider.prototype.genConversationId = function(){
	var _id = new mongoose.Types.ObjectId();
	return _id;
}


siteProvider.prototype.addConversation = function(conver, callback){
	ChatSession.findById(conver.id, function(err, doc) {
		if (err) {
			console.log(err);
			throw err;
		}

		doc.lastmodified = new Date();
		doc.lastmodifieduser = conver.user

		doc.conversations.push(conver);

		doc.save(function(err, doc) {
			if (err) {
				console.log(err);
				throw err;
			}
			
			callback(conver);
		});
	});
}


exports.siteProvider=siteProvider;