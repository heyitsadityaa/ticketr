export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20'
});