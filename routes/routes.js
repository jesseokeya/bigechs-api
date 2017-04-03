// Require
const express = require('express');
const twilio = require('twilio');
const configDb = require('.././configDb/database.js');
const mailgun = require('mailgun-js')(configDb.mailgun);
const email = require('./templates/emailTemplate.js');
const router = express.Router();
const text = configDb.twilio;
var client = new twilio.RestClient(text.accountSid, text.authToken);

router.get('/', (req, res) => {
    res.send(" Welcome to bigechs-api 🙏🏽 ");
});

router.post('/ordermail', (req, res) => {
    let user = req.body;
    let ordermail = {};
    //console.log(user);
    let data = {
        from: "Big Etchs Kitchen <no-reply@bigechs.com>",
        to: 'jesseokeya@gmail.com, jesse_okeya@yahoo.ca',
        subject: 'Order Placed',
        html: email(user)
    };

    mailgun.messages().send(data, function(error, body) {
        ordermail = {
            id: body.id,
            message: body.message,
            user: user,
            status: 'success'
        };
        let phonenumbers = ['+16134135540', '+16134135540', '+16134135540'];
        //let phonenumbers = ['+16134135540', '+16138909733', '+16138697075'];
         phonenumbers.map(function(number) {
            client.messages.create({
                body: email(user),
                to: number, // Text this number
                from: text.number // From a valid Twilio number
            }, function(err, message) {
                if (err) {
                    return err;
                }
            });
        });
        res.send(ordermail);
    });


})


module.exports = router;
