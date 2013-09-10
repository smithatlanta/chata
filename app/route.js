app = module.parent.exports.app;
var baseController = require('../controllers/base');
var siteController = require('../controllers/site');
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

app.get('/', siteController.index);
app.post('/signin', accountController.authenticate);

//ACCOUNT

app.get('/auth', accountController.authenticate);

app.post('/account', accountController.addAccount);
app.put('/account', authenticate, accountController.updateAccount);
app.del('/account/:id', authenticate, accountController.deleteAccount);
app.get('/account/:id', authenticate, accountController.getAccount);
app.get('/accounts', authenticate, accountController.getAccounts);
app.get('/accounts/short', authenticate, accountController.getAccountsShort);
app.post('/account/resetpassword', accountController.resetPassword);
app.post('/account/setpassword', accountController.setPassword);

app.post('/search', authenticate, siteController.searchChatSessions);

app.post('/chatsession', authenticate, siteController.addChatSession);
app.put('/chatsession', authenticate, siteController.updateChatSession);
app.del('/chatsession/:id', authenticate, siteController.deleteChatSession);
app.get('/chatsessions', authenticate, siteController.getChatSessions);
app.get('/chatsession/:id', authenticate, siteController.getChatSession);
app.post('/chatsession/conversation', authenticate, siteController.addConversation);
// redirect all others to the index (HTML5 history)
app.get('*', siteController.index);