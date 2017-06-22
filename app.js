var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

// Config
var setupConfig = require('./config/setupConfig');

// Dialogs
var getStartedDialog = require('./dialogs/getStartedDialog');
var initializeDialog = require('./dialogs/initializeDialog');
var menuDialog = require('./dialogs/menuDialog'); 
var businessTypeDialog = require('./dialogs/businessTypeDialog');
var categoryDialog = require('./dialogs/categoryDialog');
var getDetailsDialog = require('./dialogs/getDetailsDialog');
var overviewDialog = require('./dialogs/overviewDialog');
var infoDialog = require('./dialogs/infoDialog');
var statDialog = require('./dialogs/statDialog');
var functionDialog = require('./dialogs/functionDialog');
var sampleBotDialog = require('./dialogs/sampleBotDialog');
var defaultDialog = require('./dialogs/defaultDialog');

var constant = require('./constant');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();

setupConfig.middleWare(server, restify);

server.listen(3978, function(){
    console.log('restify listening to port: ', server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: constant.MICROSOFT_APP_ID,
    appPassword: constant.MICROSOFT_APP_PASSWORD
    // appId: process.env.MICROSOFT_APP_ID,
    // appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
bot.use({
    botbuilder: function(session, next){
                    // Clear data on start and on reset
                    console.log(session);
                    var response = session.message.text; 
                    if (response == 'Get_Started') {
                        session.perUserInConversationData = {};
                        session.userData = {};
                        session.conversationData = {};
                    }

                    if(!session.userData.firstRun){
                        session.userData.firstRun = true;
                        session.beginDialog('/GetStarted');
                    }else{
                        //session.beginDialog('/Default', {response: response});
                        next();
                    }

                }
});


// Default route of dialog
bot.dialog('/', defaultDialog);

bot.dialog('/GetStarted', getStartedDialog)
.triggerAction({
    matches: /^start over|restart$/
});

bot.dialog('/Initialize', initializeDialog)
.triggerAction({matches: /^show menu|menu$/})
.reloadAction('reloadMenu', null, { matches: /^menu|show menu/i });

bot.dialog('/Help', [
    function (session) {
        session.endDialog("Global commands that are available anytime: \n\n* start over - Restart the whole conversation. \n* menu - Exit and returns to the menu.\n* help - Displays these commands.");
    }
])
.triggerAction({
    matches: /^help$/
});

bot.dialog('/Menu', menuDialog);

bot.dialog('/BusinessType', businessTypeDialog);

bot.dialog('/Category', categoryDialog);

bot.dialog('/GetDetails', getDetailsDialog.URL);

bot.dialog('/GetEmail', getDetailsDialog.Email);

bot.dialog('/Overview', overviewDialog);

bot.dialog('/Information', infoDialog);

bot.dialog('/Statistics', statDialog);

bot.dialog('/BotFunctions', functionDialog);

bot.dialog('/BotSamples', sampleBotDialog);