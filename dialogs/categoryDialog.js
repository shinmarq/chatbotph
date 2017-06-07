var builder = require('botbuilder');

module.exports = [
    function(session){
        // Ask the user to select an item from a carousel.
        var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("Food and Beverages")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Food and beverages", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Fashion")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Fashion", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Retail")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Retail", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Hospitality")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Hospitality", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("Others")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Others", "SELECT")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Food and beverages|Fashion|Retail|Hospitality|Others");
    },
    function(session, results){
        var response = results.response.entity;
        session.userData.botType = response;
        switch(response){
            case 'Food and beverages':
                session.replaceDialog('/GetDetails');
            break;

            case 'Fashion':
                session.replaceDialog('/GetDetails');
            break;

            case 'Retail':
                session.replaceDialog('/GetDetails');
            break;

            case 'Hospitality':
                session.replaceDialog('/GetDetails');
            break;

            case 'Others':
                session.replaceDialog('/GetDetails');
            break;
        }
    }
]