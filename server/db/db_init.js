require('dotenv').config();

// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

// Initialize Cloudant with settings from .env
var url = process.env.cloudant_url;
var username = process.env.cloudant_username;
var apiKey = process.env.cloudant_apikey;
var cloudant = Cloudant({ url:url, plugins: { iamauth: { iamApiKey: apiKey}} });

exports.cloudant = cloudant;
