var builder = require('botbuilder');

module.exports = [
    function(session){
        var style = builder.ListStyle['button'];
        session.send('here\'s how we can help you:');
        session.send('1.) BOT Creation: We will develop and customize the bot that you need for your business. No need to worry about getting a developer of your own to make one.');
        session.send('2.) Chatbot Maintenance - We will make sure that all the techinical requirements (hosting, NLP, etc.) of your bot are checked regularly and in optimum form.');
        session.send('3.) Training - In order to make your chatbot smarter on a daily basis. Our team will be in charge of helping you train your bot to accommodate customers so you can focus on what you\'re good at - making your business grow.');
        builder.Prompts.choice(session, '4.) Promotion - You can have the best bot in the world but if nobody knows about it, it\'s useless. Our growth team will help you drive business and traffic to your bot so you can automate your processes.', 
                                'Ok, I want one now!|Chatbot Examples', {listStyle: style});
    },
    function(session, results){
        var response = results.response.entity;
        response == 'Ok, I want one now!' ? session.replaceDialog('/BusinessType') : session.replaceDialog('/BotSamples');
    }
]