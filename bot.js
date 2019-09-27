// bot.js

const Twitter = require('twitter');
const dotenv = require('dotenv').config();
const config = require('./config.js');
const client = new Twitter(config);

client.post('statuses/update', {status: 'I Love Twitter'}, (error, tweet, response) => {
	console.log(tweet);
});

