var accountProvider = require('../models/accountProvider').accountProvider;
var accountProvider = new accountProvider();
var account = require('../models/accountProvider').Account;
var moment = require('moment');

exports.authenticate = function(req,res){
    var userpass = req.headers.authorization.split(':');
    accountProvider.authenticate(userpass[0], userpass[1], null, function(data){
        if(data === null){
            res.send(401);
        }
        else{
            res.json(data);
        }
    });
};

exports.authenticateSession = function(req,res, callback){
    var userpass = req.headers.authorization.split(':');
    accountProvider.authenticate(userpass[0], userpass[1], userpass[2], function(data){
        callback(data);
    });
};

exports.addAccount =  function(req, res){
    accountProvider.addAccount(req.body, function(user){
        res.json(user);
    });
};

exports.updateAccount =  function(req, res){
    accountProvider.updateAccount(req.body, function(success){
        res.json(success);
    });
};

exports.deleteAccount = function(req, res){
    accountProvider.deleteAccount(req.params.id, function(success){
        res.send(success);
    });
};

exports.getAccount = function(req, res){
    accountProvider.getAccount(req.params.id, function(user){
        res.json(user);
    });
};

exports.getAccountsShort = function(req, res){
    accountProvider.getAccounts(function(users){
        var out = [];
        for(var x=0; x< users.length;x++)
        {
            out.push(users[x].username);
        }
        res.json(out);
    });
};

exports.getAccounts = function(req, res){
    accountProvider.getAccounts(function(users){
        var out = [];
        for(var x=0; x< users.length;x++)
        {
            var user = {};
            user.name = users[x].name;
            user.username = users[x].username;
            user.role = users[x].role;
            user.email  = users[x].email;
            user.id = users[x]._id;

            out.push(user);
        }
        res.json(out);
    });
};

exports.searchAccount =  function(req, res){
    accountProvider.searchAccount(req.query.type, function(accounts){
        res.json(accounts);
    });
};

exports.setPassword = function(req, res){
    accountProvider.setPassword(req.body, function(success){
        res.send(200);
    });
};

exports.resetPassword = function(req, res){
    accountProvider.resetPassword(req.body, function(success){
        res.send(200);
    });
};