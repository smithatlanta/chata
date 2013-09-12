var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
config = require('../config/config');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Account = new Schema({
    name: {
        type: String,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        index: true
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    application: {
        type: String
    },
    dateadded: {
        type: Date
    }
});


mongoose.model('Account', Account, 'account');

var Account = mongoose.model('Account');

accountProvider = function(){};

accountProvider.prototype.authenticate = function(username, password, unixoffset, callback) {
    if(unixoffset !== null)
    {
        var now = moment().valueOf();
        if(now > unixoffset)
        {
            callback(null);
        }
    }

    Account.findOne({
        username: username,
        application: config.EnvConfig.appName
    },
    function(err, doc) {
        if(doc === null){
            callback(null);
        }
        else
        {
            if(compare(password, doc.password)){
                var user = {};
                var nowplusone = moment().add('days', 7);
                user.username = username;
                user.password = password;
                user.session = nowplusone.valueOf();
                user.name = doc.name;
                user.email = doc.email;
                user.id = doc._id;
                if(doc.role === 'admin'){
                    user.show = true;
                }
                else
                {
                    user.show = false;
                }
                callback(user);
            }
            else{
                callback(null);
            }
        }
    });
};

accountProvider.prototype.addAccount = function(account, callback){
    Account.find({'email' : account.email, 'application' : config.EnvConfig.appName}, function(err, doc) {
        if(doc.length === 0){
  
            var accountToSave = new Account(account);
            if(account.role === undefined){
                accountToSave.role = 'user';
            }

            accountToSave.application = config.EnvConfig.appName;
            accountToSave.dateadded = new Date();
            accountToSave.password = encryptPassword(account.password);

            accountToSave.save(function(err) {
                if (err) {
                  console.log(err);
                  throw err;
                }
            });
            callback(accountToSave._id);
        }
        else
        {
            callback(null);
        }
    });
};

accountProvider.prototype.updateAccount = function(account, callback){
    Account.findById(account._id, function(err, doc) {

        doc.name = account.name;
        doc.username = account.username;
        doc.role = account.role;
        doc.email = account.email;
        doc.application = config.EnvConfig.appName;
        if(account.password !== undefined){
            doc.password = encryptPassword(account.password);
        }

        doc.save(function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(doc._id);
        });

    });
};

accountProvider.prototype.deleteAccount = function(id, callback){
    Account.remove({_id: id}, function(err) {
        if (err) {
            console.log(err);
            callback("false");
        }
    });
    callback("true");
};

accountProvider.prototype.getAccount = function(id, callback){
    Account.findById(id, function(err, account) {
        if (err) {
            console.log(err);
            throw err;
        }
        callback(account);
    });
};

accountProvider.prototype.getAccounts = function(callback){
    Account.find({ 'application': config.EnvConfig.appName },function(err, accounts) {
        if (err) {
            console.log(err);
            throw err;
        }
        callback(accounts);
    });
};

accountProvider.prototype.searchAccount = function(qrytype, callback){
    if(qrytype === 'search') {
        var query = Account.find({application: config.EnvConfig.appName}).sort({name: 'asc'});
        query.exec(function(err, accounts){
        var arrAccount = [];
            for(var ctr=0; ctr < accounts.length; ctr++) {
                var tmpDate = (accounts[ctr].dateadded.getMonth()+1) + "/" + accounts[ctr].dateadded.getDate() + "/" + accounts[ctr].dateadded.getFullYear();
                arrAccount.push([accounts[ctr].name, accounts[ctr].username, accounts[ctr].role, accounts[ctr].email, tmpDate, accounts[ctr]._id, ""]);
            }
            callback(arrAccount);
        });
    }
    if(qrytype === 'name') {
        Account.find({ 'name': { $ne : null } ,'application': config.EnvConfig.appName}).distinct('name', function(err, users){
            users.sort();
            callback(users);
        });
    }

    if(qrytype === 'allusers'){
        var query = Account.find({application: config.EnvConfig.appName}).sort({name: 'asc'});
        query.exec(function(err, accounts){
            callback(accounts);
        });
    }

    if(qrytype === '') {
        callback();
    }
};

accountProvider.prototype.resetPassword = function(user, callback){
    Account.findOne({username: user.username, application: config.EnvConfig.appName}, function(err, doc) {
        if(doc)
        {
            dispatchResetPasswordLink(doc, function(e, m){
                callback();
            });
        }
    });
};

accountProvider.prototype.setPassword = function(userpass, callback){
    Account.findOne({username: userpass.username, application: config.EnvConfig.appName}, function(err, doc) {
        if(doc)
        {
            doc.password = encryptPassword(userpass.password);
            doc.save(function(err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                callback();
            });
        }
    });
};

server = require("emailjs/email").server.connect({
    host        : config.EnvConfig.smtpHost,
    user        : config.EnvConfig.smtpUser,
    password    : config.EnvConfig.smtpPassword,
    ssl         : true
});

dispatchResetPasswordLink = function(account, callback)
{
    server.send({
        from         : 'chata Admin',
        to           : account.email,
        subject      : 'Password Reset',
        text         : 'something went wrong... :(',
        attachment   : composeEmail(account)
    }, callback );
};

composeEmail = function(o)
{
    var link = config.EnvConfig.localURL + '/setpassword?username='+o.username;
    var html = "<html><body>";
        html += "Hi "+o.name+",<br><br>";
        html += "Your username is : <b>"+o.username+"</b><br><br>";
        html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
        html += "Cheers,<br>";
        html += "Admin<br><br>";
        html += "</body></html>";
    return  [{data:html, alternative:true}];
};

function compare(password, dbPassword){
    return bcrypt.compareSync(password, dbPassword);
}

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.accountProvider=accountProvider;