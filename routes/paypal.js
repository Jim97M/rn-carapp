const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

var amt = null;
var name= null;
var currency = null;

router.get('/pay/:amt', (req, res) => {
    amt = req.params.amt;
    name = req.params.name;
    currency = req.params.currency;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
           "payment_method": "paypal"
        },
    
    "redirect_urls": {
        "return_url": "http://192.168.100.254:9999/api/pay/success",
        "cancel_url": "http://192.168.0.29:9999/api/pay/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": name,
                "sku": "001",
                "price": amt,
                "currency": currency,
                "quantity": 1
            }]
        },
    "amount": {
        "currency": "USD",
        "total": amt
    },
    "description": "Your Amount Is"
    }]
};

paypal.payment.create(create_payment_json, function(error, payment){
    if(error){
        throw error;
    } else {
        for(let i = 0; i < payment.links.length; i++){
            if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
            }
        }
     }
  });

});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log("payerId", payerId, "paymentId", paymentId)
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amt
            }
        }]
    };

 paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){
    if(error){
        console.log("Error", error.response);
        throw error;
    }else {
        res.sendFile(__dirname, '../helpers/success.html')
    }
 });

});

router.get('/cancel', (req, res) => res.sed('Cancelled'));

export default router;