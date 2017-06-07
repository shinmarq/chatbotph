var builder = require('botbuilder');

module.exports = [
    function (session) {
        var style = builder.ListStyle['button'];
        builder.Prompts.choice(session, "Let's get started!", "Menu|Quit", { listStyle: style, maxRetries: 0});
    },
    function (session, results) {
        console.log(results);
        if(results.response && results.response.entity != 'Quit') {
            // Launch dialog
            session.beginDialog('/' + results.response.entity);
        }else if(!('response' in results)) {
            // Go to Default dialogs
            session.replaceDialog('/');
        }else{
            // Exit the menu
            session.endDialog();
        }
    },
    function (session, results) {
        // The menu runs a loop until the user chooses to (quit).
        //var response = results.response.entity;
        if(('response' in results) && results.response.entity == 'Finish'){
            session.endConversation('Okay will contact you soon thanks!');
        }else{
            session.endConversation('Okay, talk to you later.');
        }
    }
]