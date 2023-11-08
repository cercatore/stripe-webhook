// This is your test secret API key.
const stripe = require('stripe')('sk_test_51O601THRx8IgMk2MO0K3BIBPTt1Sytra8OTd8AafSz3uRCx7sOpJmuo6YtjBEiZfwPHitjeE0MfgaibTbWKASNNr00PhIDf71t');
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_6d69735ad8569d0bfe93dc969e3ec14ae6f555739039e8c16e526ea41fc654c4';
const express = require('express');
const app = express();
// ^^^ not needed;
const {strunz} = require('./zindex.js');

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        strunz();
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

app.listen(4242, () => console.log('Running on port 4242'));
  
module.exports = app;