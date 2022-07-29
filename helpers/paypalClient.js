"use strict"

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/*
*Returns PayPal HTTP client instance with environment that has credentials
*
*/

function client(){
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/*
*Set up and return PayPal JavaScript SDK environment with 
*SandBoxEnvironment. In Production, use LiveEnvironment
*/

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

async function prettyPrint(jsonData, pre= ""){
       let pretty = "";
       function capitalize (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
       }

       for(let key in jsonData){
          if(jsonData.hasOwnProperty(key)){
            if(isNaN(key)) pretty += pre + capitalize(key) + ": ";
            if(typeof jsonData[key] === "object"){
                pretty +="\n";
                pretty += await prettyPrint(jsonData[key], pre + "  ");
            } else {
                pretty += jsonData[key] + "\n";
            }
          }
       }
       return pretty;       
}

module.exports = {client: client, prettyPrint: prettyPrint};