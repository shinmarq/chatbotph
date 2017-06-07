var builder = require('botbuilder');
var setupConfig = require('../config/setupConfig');

// get the URL and validate
module.exports.URL = [

    function(session, args){
        if(args && args.reprompt){
            builder.Prompts.text(session, 'Invalid link or URL please enter something like this: https://facebook.com/yourpage or fb.com/yourpage');
        }else{
            session.send('👌');
            builder.Prompts.text(session, 'May I have your business Facebook Page or Website so we can see how we can automate your business? Please enter the link.');
        }
    },
    function(session, results){
        console.log(results.response);
        var urlregex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com|fb.com\/?/;
        var matched = urlregex.test(results.response);

        if(!matched){
            session.replaceDialog('/GetDetails', { reprompt: true });
        }else{
            session.userData.fbPage = results.response;
            session.replaceDialog('/GetEmail');
        }
    }
]

// get the Email and Contact then validate
module.exports.Email = [

    function(session, args){
        if(args && args.reprompt){
            builder.Prompts.text(session, 'Invalid e-mail re-enter your e-mail.');
        }else{
            session.send('Noted.');
            builder.Prompts.text(session, 'May I have your email?');
        }
    },
    function(session, results){
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        var matched = emailregex.test(results.response);

        if(!matched){
            session.replaceDialog('/GetEmail', { reprompt: true });
        }else{
            session.userData.emailAdd = results.response;
            session.send('Cool.');
            builder.Prompts.number(session, 'Lastly, May I have the contact number so my human colleagues can contact you ASAP?');
        }
    },
    function(session, results){
        session.userData.contactNo = results.response;
        var style = builder.ListStyle['button'];
        builder.Prompts.choice(session, 'Awesome! We\'re almost done! 👏', 'Finish', {listStyle: style});
    },
    function(session, results){
        session.userData.name =  session.message.user.name;
        setupConfig.emailSender(session.userData);
        //console.log('EMAIL SENT... ', session.userData);
        session.endDialogWithResult(results);
    }

]



