function setDevelopmentConfig(){
    DatabaseConfig.port = 27017;
    DatabaseConfig.host = 'localhost';

    EnvConfig.environment = "dev";
    EnvConfig.port = 3000;
    EnvConfig.localURL = "http://localhost:" + EnvConfig.port;
}

function setProductionConfig(){
    DatabaseConfig.port = 12345;
    DatabaseConfig.host = 'ds051437.mongolab.com';

    EnvConfig.environment = "prod";
    EnvConfig.port = 20005;
    EnvConfig.localURL = "https://somesiteoutthere";
}

var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

var EnvConfig = {
    appName     : String,
    environment : String,
    port        : Number,
    localURL    : String,
    smtpHost    : String,
    smtpUser    : String,
    smtpPassword    : String
};

EnvConfig.appName = 'chata';
EnvConfig.smtpHost = 'smtp.gmail.com';
EnvConfig.smtpUser = 'xyz@gmail.com';
EnvConfig.smtpPassword = 'xyz';

DatabaseConfig.name = 'chata';
DatabaseConfig.user = 'app_chata';
DatabaseConfig.pass = 'app_chata';

module.exports.DatabaseConfig = DatabaseConfig;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;