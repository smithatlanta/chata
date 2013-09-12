app = module.parent.exports.app;
var baseController = require('../controllers/base');
var chatController = require('../controllers/chat');
var accountController = require('../controllers/account');

/* Middleware authentication */
function authenticate(req, res, next) {
    if (req.headers.authorization) {
		accountController.authenticateSession(req, res, function(user){
			if(user !== null){
				next();
			}
			else{
				res.send(401);
			}
		});
    }
    else
    {
		res.send(401);
    }
}

//GUI Route
if (config.EnvConfig.environment === "prod")
{
    // Make sure all traffic is thru ssl in production
    app.get('*',function(req,res,next){
        if(req.headers['x-forwarded-proto']!='https'){
            res.redirect('https://some production site using https');
        }
        else
        {
            next();
        }
    });
}

app.get('/', chatController.index);
app.post('/signin', accountController.authenticate);
app.post('/account', accountController.addAccount);
app.put('/account', authenticate, accountController.updateAccount);
app.del('/account/:id', authenticate, accountController.deleteAccount);
app.get('/account/:id', authenticate, accountController.getAccount);
app.get('/accounts', authenticate, accountController.getAccounts);
app.get('/accounts/short', authenticate, accountController.getAccountsShort);
app.post('/account/resetpassword', accountController.resetPassword);
app.post('/account/setpassword', accountController.setPassword);

app.post('/chatsession', authenticate, chatController.addChatSession);
app.put('/chatsession', authenticate, chatController.updateChatSession);
app.del('/chatsession/:id', authenticate, chatController.deleteChatSession);
app.get('/chatsessions', authenticate, chatController.getChatSessions);
app.get('/chatsession/:id', authenticate, chatController.getChatSession);
app.post('/chatsession/conversation', authenticate, chatController.addConversation);
app.post('/chatsession/search', authenticate, chatController.searchChatSessions);

// redirect all others to the index (HTML5 history)
app.get('*', chatController.index);