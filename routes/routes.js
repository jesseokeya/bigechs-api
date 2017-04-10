// Require
const express = require('express');
const twilio = require('twilio');
const configDb = require('.././configDb/database.js');
const mailgun = require('mailgun-js')(configDb.mailgun);
const messenger = require('./templates/emailTemplate.js');
const router = express.Router();
const mongoose = require('mongoose');
const order = require('.././models/schema.js');

const text = configDb.twilio;
mongoose.Promise = global.Promise;
mongoose.connect(configDb.uri);
const db = mongoose.connection;
let client = new twilio.RestClient(text.accountSid, text.authToken);
let allOrders = mongoose.model('Order');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Get Requests */
router.get(['/','/index'], (req, res, next) => {
    res.send(" Welcome to bigechs-api 🙏🏽 ");
});

router.get('/getAllOrders', (req, res, next) => {
    allOrders.find({}, function(err, results){
      res.send(results);
    });
});

router.get('/findPerson/:person', (req, res, next) => {
    allOrders.find({name: req.params.person}, function(err, results){
      res.send(results);
    });
})

/* Post Requests */
router.post('/placeorder', (req, res, next) => {
    let user = req.body;
    let ordermail = {};
    //console.log(user);
    let data = {
        from: "Big Etchs Kitchen <no-reply@bigechs.com>",
        to: 'jesseokeya@gmail.com, jesse_okeya@yahoo.ca',
        subject: 'Order Placed',
        html: messenger.email(user)
    };

    mailgun.messages().send(data, function(error, body) {
        ordermail = {
            id: body.id,
            message: body.message,
            user: user,
            status: 'success'
        };
        let phonenumbers = ['+16134135540'];
        //let phonenumbers = ['+16134135540', '+16138909733', '+16138697075'];
        phonenumbers.map(function(number) {
            client.messages.create({
                body: messenger.phone(user),
                to: number, // Text this number
                from: text.number // From a valid Twilio number
            }, function(err, message) {
                if (err) {
                    console.log(message);
                    return err;
                }
            });
        });
        let orderObj = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            order: req.body.order,
            date: messenger.timeStamp()
        }
        let latestOrder = new order(orderObj);
        latestOrder.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully!');
            res.send(ordermail);
        });
    });


});

router.post('/api/submitForm', (req, res) => {
    let user = req.body;
    //console.log(user);
    let data = {
        from: 'the-winning-consultant-bot <no-reply@twc.com>',
        to: 'thewinningconsultant@gmail.com, jesseokeya@gmail.com',
        subject: 'The Winning Consultant',
        html: messenger.emailTwc(user)
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
    res.send(req.body);
})


module.exports = router;
