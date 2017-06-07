var builder = require('botbuilder');

module.exports = [

    function(session){
        var style = builder.ListStyle['button'];
        session.send('Ok, I will be your guru for Chatbot101. ✏️');
        session.send('Chatbots are a computer program designed to simulate conversation with human users, especially over the Internet.');

        builder.Prompts.choice(session, 'Imagine having someone manning your business 24/7 to accommodate customers\'s requests and do business for you? The possibilities are endless.', 'Got it! I want one!|Why do i need one?|Chatbot Examples', {listStyle: style});
    },
    function(session, results){
        var response = results.response.entity;

        switch(response){
            case 'Got it! I want one!':
                session.replaceDialog('/BusinessType');
            break;
            case 'Why do i need one?':
                session.replaceDialog('/Information');
            break;
            case 'Chatbot Examples':
                session.replaceDialog('/BotSamples');
            break;

        }
    }

]