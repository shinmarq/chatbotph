var builder = require('botbuilder');

module.exports = [
    function (session) {
        session.send("What can I do for you?");
        
        // Ask the user to select an item from a carousel.
        var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("Make A Chatbot")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Make a Chatbot", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("what is a Chatbot?")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Chatbot", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Chatbot Examples")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Examples", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("What can i do?")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Chatbot does", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Chatbot News")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, "http://chatbot.ph", "Coming Soon")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Make Chatbot|Chatbot|Examples|Chatbot does");
        
    },
    function (session, results) {
        var response = results.response.entity;

        switch (response) {
            case 'Make Chatbot':
                session.replaceDialog('/BusinessType');
            break;

            case 'Chatbot':
                session.replaceDialog('/Overview');
            break;

            case 'Examples':
                session.replaceDialog('/BotSamples');
            break;

            case 'Chatbot does':
                session.replaceDialog('/BotFunctions');
            break;

        }
    }    
]