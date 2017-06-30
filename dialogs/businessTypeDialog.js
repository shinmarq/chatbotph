var builder = require('botbuilder');

module.exports = [
    function(session){
        session.send('Alright, let\'s get you started in creating your first chatbot! 💪');
        session.send('Let me ask you a few questions first so I can tailorfit your bot for you!');
        session.send('What kind of business do you have?');

        var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("PRODUCTS")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1498803831/Screen_Shot_2017-06-30_at_2.22.46_PM_utedm8.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Products", "SELECT")
                    ]),
                new builder.HeroCard(session)
                    .title("SERVICES")
                    .images([
                        builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1498803865/Screen_Shot_2017-06-30_at_2.23.00_PM_urfxe8.png")
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Services", "SELECT")
                    ]) 
            ]);
        builder.Prompts.choice(session, msg, "Products|Services");
    },
    function(session, results){
        var response = results.response.entity;

        switch(response){
            case 'Products':
                session.replaceDialog('/Category');
            break;

            case 'Services':
                session.userData.botType = response;
                session.replaceDialog('/GetDetails');
            break;
        }
    }
]