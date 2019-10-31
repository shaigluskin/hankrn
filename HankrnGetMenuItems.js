const https = require('https');
const request = require('request');

exports.handler = function(context, event, callback) {
  console.log(event)
  let twiml = new Twilio.twiml.MessagingResponse();
    const markoToken = context.MARKO_API_TOKEN;
    const options = {
      url: `https://qa-marko.aramark.net/v1/service_menu_items/flat?meal_period_id=1&service_date=10/28/2019&location_id=145539&fields=recipe_name`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
           'apikey': markoToken,
         'smoke': true,
      }
    };
        
    function makeReq(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('GOT 200');
        console.log(JSON.parse(body));
        console.log(response);
        twiml.message(JSON.parse(body).service_items[0].recipe_name);
        callback(null, twiml);

        
      }else{
          console.log(error)
          console.log(response.statusCode)
      }
    }
    request(options, makeReq);
}