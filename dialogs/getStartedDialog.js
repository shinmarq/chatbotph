var builder = require('botbuilder');

module.exports = [

    function (session) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("ChatbotPH")
            .text("Easiest way to build, Manage, and train your own chatbot for you business.")
            .images([
                 builder.CardImage.create(session, "http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.sendTyping();
        session.send(msg);
        session.send("Hi, welcome to ChatbotPH! I can help you create, train and maintain a chatbot like me to automate how you do your business. 💯");
        session.beginDialog('/Help');
    },
    function (session, results) {
        // Display menu
        session.beginDialog('/Initialize');
    },
    function (session, results) {
        // Always say goodbye
        session.endConversation("Talk to you later!");
    }
    
]