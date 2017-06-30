var builder = require('botbuilder');

module.exports = [

    function(session){
        var imgMsg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://res.cloudinary.com/hobwovvya/image/upload/v1498805586/Screen_Shot_2017-06-30_at_2.52.24_PM_arw7yv.png"
            }]);
        var style = builder.ListStyle['button'];
        session.send('Good question! Here\'s why...');
        session.send('For the first time ever, people are spending more time on messaging apps compared to social networking sites.');
        session.send(imgMsg);

        builder.Prompts.choice(session, 'That means that most of your customers are now on messaging apps and you need to be there too to get their business!', 'Cool! I want one!|Chatbot statistics|Chatbot Examples', {listStyle: style});
    },
    function(session, results){
        var response = results.response.entity;

        switch(response){
            case 'Cool! I want one!':
                session.replaceDialog('/BusinessType');
            break;
            case 'Chatbot statistics':
                session.replaceDialog('/Statistics');
            break;
            case 'Chatbot Examples':
                session.replaceDialog('/BotSamples');
            break;
        }

    }

]