// Require
const configDb = require('.././configDb/database.js');
const express = require('express');
const router = express.Router();
const mailgun = require('mailgun-js')(configDb.mailgun);

router.get('/', (req, res) => {
    res.send(" Welcome to bigechs-api 🙏🏽 ");
});

router.post('/ordermail', (req, res) => {
    let data = {
        from: "Big Etchs Kitchen <no-reply@bigechs.com>",
        to: 'jesseokeya@gmail.com',
        subject: 'Order Placed',
        text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
    res.send('Suceess!!')
})


module.exports = router;
