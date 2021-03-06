var constant = require('../constant');

module.exports.middleWare = function(server, restify){

    //Middleware | Bundled Plugins
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.authorizationParser());

}

module.exports.emailSender = function(ticket){

    let htmlEmailBody = '<h2>Hi Ron, Here is the details of request.</h2><b><b>' +
                        '<h3>Name: '+ ticket.name +'</h3><b>' +
                        '<h3>Page: '+ ticket.fbPage +'</h3><b>' +
                        '<h3>Email: '+ ticket.emailAdd +'</h3><b>' +
                        '<h3>Contact #: '+ ticket.contactNo +'</h3><b>' +
                        '<h3>Bot Type: '+ ticket.botType +'</h3><b>';

    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email('shin@chatbot.ph');
    var toEmail = new helper.Email('hello@chatbot.ph');
    var subject = 'ChatBot Request Ticket';
    var content = new helper.Content('text/html', htmlEmailBody);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
    if (!error) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        console.log('Email sent');
    }
    });

}