var http = require('http')

var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var i18n = require("i18n");

i18n.configure({
    locales: ['en', 'pt'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    register: global
});
var lang;

app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    if (req.acceptsLanguages('pt', 'en') == 'pt') {
        lang = 'pt';
    } else {
        lang = 'en';
    }
    i18n.setLocale(lang);
    res.render('pages/home');
});

app.post('/contact', function(req, res){
    var mailer = require('./app/email.js');

    var userLang = req.body.user_lang;
    var name = req.body.name;
    var email = req.body.email;
    var Subject = req.body.Subject;
    var message = req.body.message;
    
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: mailer.email_user,
        pass: mailer.email_pass
        }
    });

   
    if(userLang === 'en') {
        var mailOptions = {
            from: `"${name}" <${email}>`,
            to: `getlayer Internet & Software <${mailer.email_to}>`,
            subject: `[getlayer.com] ${Subject}`,
            text: message,
            html: `<b>${email}</b> says:<br><br>${message}`
        };
    } else {
        var mailOptions = {
            from:  `"${name}" <${email}>`,
            to: `getlayer Internet & Software <${mailer.email_to}>`,
            subject: `[getlayer.com] ${Subject}`,
            text: message,
            html: `<b>${email}</b> diz:<br><br>${message}`
        };
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            if(userLang === 'en') {
                res.send('<script>alert("Your message was not sent");window.location.href = "/";</script>');
            } else {
                res.send('<script>alert("Sua mensagem não foi enviada");window.location.href = "/"</script>');
            }
        }
        if(userLang === 'en') {
            res.send('<script>alert("Your message has been sent successfully");window.location.href = "/";</script>');
        } else {
            res.send('<script>alert("sua mensagem foi enviada com sucesso");window.location.href = "/"</script>');
        }
    });
});

app.use(express.static(__dirname + '/public'));

module.exports = app;

http.createServer(app).listen(3000, function() {
    console.log('Server listening on port: ' + this.address().port);
});

