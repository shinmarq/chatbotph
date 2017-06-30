var builder = require('botbuilder');

 module.exports = [

     function(session){
        var cardURL = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments([

            new builder.HeroCard(session)
            .title('E-Commerce Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498806007/Screen_Shot_2017-06-30_at_2.57.13_PM_gdylki.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/251971398473021/', 'eBay Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/askvoila/', 'Askvoila Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot')
                    ]),

            new builder.HeroCard(session)
            .title('Food & Restaurant Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498806002/Screen_Shot_2017-06-30_at_2.57.27_PM_ous4ol.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/GoPandaIndia', 'Go Panda Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/24922591487', 'Whole Foods Market Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot') 
                    ]),

            new builder.HeroCard(session)
            .title('Fashion Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498805995/Screen_Shot_2017-06-30_at_2.57.42_PM_eji1bp.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/shopfynd/', 'Fynd Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/chatshopper/', 'chatShopper Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot')
                    ]),

            new builder.HeroCard(session)
            .title('Hotel Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498806002/Screen_Shot_2017-06-30_at_2.57.53_PM_dfcchu.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/snaptravel/', 'SnapTravel Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/603355693096453', 'JPark Island Resort & Waterpark Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot') 
                    ]),

            new builder.HeroCard(session)
            .title('Travel Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498806010/Screen_Shot_2017-06-30_at_2.58.04_PM_q8je1z.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/kayak/', 'KAYAK Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/instalocate', 'Instalocate Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot') 
                    ]),

            new builder.HeroCard(session)
            .title('News Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498805986/Screen_Shot_2017-06-30_at_2.58.18_PM_kduvs6.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/5550296508', 'CNN Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/310621318958658', 'Rappler Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot') 
                    ]),

            new builder.HeroCard(session)
            .title('Other Bots')
            .images([ builder.CardImage.create(session, 'http://res.cloudinary.com/hobwovvya/image/upload/v1498805985/Screen_Shot_2017-06-30_at_2.58.27_PM_n8zk1x.png') ])
            .buttons([  builder.CardAction.openUrl(session, 'https://www.messenger.com/t/788720331154519', 'Poncho Bot'), 
                        builder.CardAction.openUrl(session, 'https://www.messenger.com/t/1710996645814926', 'Mica, the Hipster Cat Bot'), 
                        builder.CardAction.imBack(session, 'Make me a Bot', 'Make me a Bot') 
                    ]),

        ]);

        //session.send(cardURL);
        builder.Prompts.choice(session, cardURL, 'Make me a Bot');
     },
     function(session, results){
        session.replaceDialog('/BusinessType')
     }

 ]