export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-07-30.basil'
});