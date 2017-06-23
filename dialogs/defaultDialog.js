var builder = require('botbuilder');
var constant = require('../constant'); 

// Wit.AI
const WIT_TOKEN = constant.WIT_TOKEN;
const {Wit, log} = require('node-wit');

module.exports = [

    function(session, args){
        var response;
        session.message.text == '' ? response = 'thumbs up' : response = session.message.text;
        const sessionId = session.message.address.user.id
        
        // Wit
        // const client = new Wit({accessToken: WIT_TOKEN});

        // client.message(response, {})
        // .then((data) => {
        //     var results = data;
        //     var entities = results.entities;
        //     if(Object.keys(entities).length == 0){
        //         if(response != 'Get_Started'){
        //             //session.endConversation('Sorry, I didn’t quite understand that yet since I’m still a learning bot. Let me store that for future reference.');
        //             session.endDialogWithResult({reply: 'Sorry, I didn’t quite understand that yet since I’m still a learning bot. Let me store that for future reference.'});
        //         }
        //     }else{
        //         var intent = entities.intent[0].value;
        //         //if(Object.keys(entities).length > 1){var inquiry_type = entities.inquiry_type[0].value;}
        //         //if(Object.keys(entities).length >= 3){var venue = entities.venues[0].value;}
        //         // if(('inquiry_type' in entities)){var inquiry_type = entities.inquiry_type[0].value;}
        //         // if(('venues' in entities)){var venue = entities.venues[0].value;}
        //         // if(('emotions' in entities)){var emotion = entities.emotions[0].value;}
        //         //witEntities(intent, session);
        //         console.log(intent);
                
        //     }
        // })
        // .catch(console.error);

        // Wit Intents and Replies
        const client = new Wit({accessToken: WIT_TOKEN});
        client.converse(sessionId, response, {})
        .then((data) => {
            var entities = data.entities;
            if(Object.keys(entities).length == 0){
                if(response != 'Get_Started'){
                    session.endConversation('Sorry, I didn’t quite understand that yet since I’m still a learning bot. Let me store that for future reference.');
                }
            }else{
                var results = data;
                var botReply = data.msg;
                var intent = entities.intent[0].value;
                witEntities(intent, botReply, session);
            }
        })
        .catch(console.error);


    },
    function(session, results){
        console.log(results);
        if(results.response && results.response.entity == 'Menu'){
            session.replaceDialog('/Menu');
        }else{
            session.replaceDialog('/');
        }
    }

]

// Replies
function witEntities(response, reply, session){
    console.log(response);
    if(reply === undefined || reply == null){response = 'DEFAULT';}
    switch(response){
        case 'greeting':
            var style = builder.ListStyle['button'];
            builder.Prompts.choice(session, reply, 'Menu', {listStyle: style});
        break;

        case 'welcome':
            //session.endConversation('You\'re welcome. :)');
            session.send(reply);
        break;

        case 'profanity':
            var style = builder.ListStyle['button'];
            //builder.Prompts.choice(session, 'No need for profanity, please tap menu that\'s might help.', 'Menu', {listStyle: style});
            builder.Prompts.choice(session, reply, 'Menu', {listStyle: style});
        break;

        case 'compliment':
            //session.endConversation('Really appreciated. :)');
            session.send(reply);      
        break;

        case 'farewell':
             //session.endConversation('Talk to you later.');
             session.send(reply);
        break;

        case 'inquiry':
            var style = builder.ListStyle['button'];
            //builder.Prompts.choice(session, 'For more information please email us at chatbotph@gmail.com or click button below', 'Menu', {listStyle: style});
            builder.Prompts.choice(session, reply, 'Menu', {listStyle: style});
        break;

        default:
            var style = builder.ListStyle['button'];
            //builder.Prompts.choice(session, 'I think you misspelled something.', 'Menu', {listStyle: style});
            builder.Prompts.choice(session, reply, 'Menu', {listStyle: style});
        break;
    }
}