var builder = require('botbuilder');

module.exports = [

    function(session){
        var style = builder.ListStyle['button'];
        session.send('chatbots are taking over the internet very soon and they will exist in a platform that everybody knows how to use - Facebook Messenger.');
        session.send('Also, it\'s relatively cheaper to make chatbots compared to websites and apps. Just look at what the guys from Facebook said during their last F8 Event:');
        session.send('https://www.youtube.com/watch?v=HXT3MAXYUCg');
        session.send('However, just like any other technology; if you don\'t know how to use it properly, you won\'t be able to maximize the potential of it. ');

        builder.Prompts.choice(session, 'That\'s where we come in to help you get a chatbot in the easiest possible way! 👊', 'Ok, Make me one|How can you help me|Chatbot Examples',  {listStyle: style});
    },
    function(session, results){
        var response = results.response.entity;

        switch(response){
            case 'Ok, Make me one':
                session.replaceDialog('/BusinessType');
            break;
            case 'How can you help me':
                session.replaceDialog('/BotFunctions');
            break;
            case 'Chatbot Examples':
                session.replaceDialog('/BotSamples');
            break;
        }
    }

]