const Twitter = require('twitter');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const config = require('./config.js');
const daysJSON = require('./days.json');

const client = new Twitter(config);

Array.prototype.contains = function(element){
	return this.indexOf(element) > -1;
};

const months = new Array();
months[0] = "janvier";
months[1] = "fevrier";
months[2] = "mars";
months[3] = "avril";
months[4] = "mai";
months[5] = "juin";
months[6] = "juillet";
months[7] = "aout";
months[8] = "septembre";
months[9] = "octobre";
months[10] = "novembre";
months[11] = "decembre";

getDays = (day) => {
	const d = new Date();
	const month = d.getMonth();
	const days = [];

	if (day === 'lundi') {
		day = 1;
	} else if (day === 'mardi') {
		day = 2;
	} else if (day === 'mercredi') {
		day = 3;
	} else if (day === 'jeudi') {
		day = 4;
	} else if (day === 'vendredi') {
		day = 5;
	} else if (day === 'samedi') {
		day = 6;
	} else if (day === 'dimanche') {
		day = 0;
	}

	d.setDate(1);
	while (d.getDay() !== day) {
		d.setDate(d.getDate() + 1);
	}
	while (d.getMonth() === month) {
		days.push(new Date(d.getTime()).getDate());
		d.setDate(d.getDate() + 7);
	}
	return days;
}

const d = new Date();
const now = {
	day: d.getDate(), // Day
	weekday: d.getDay(), // 0 to 6 - Sunday to Saturday
	month: months[d.getMonth()],
	year: d.getFullYear() // Year
}

const days = daysJSON[now.month].find(obj => obj.day == now.day);
const specificDays = daysJSON[now.month].filter(obj => obj.day.startsWith('specific'));

const publishTweets = (days, specificDays) => {

	const d = new Date();
	const publishedTweets = [];

	if (days) {
		if (days.entries) {
			days.entries.map(day => {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${day.emoji} ${day.content}\n${day.link}`;
				
				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});
	
				publishedTweets.push(tweet);
			})
		} else {
			const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${days.emoji} ${days.content}\n${days.link}`;
			
			client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
				if (error) console.log(error);
			});
	
			publishedTweets.push(tweet);
		}
	}

	if (specificDays) {

		specificDays.map(specificDay => {
			const sp = specificDay.day.split('_');
			const daysOfMonth = getDays(sp[2]);

			if (sp[1] === '1' && daysOfMonth[0] && daysOfMonth[0] === now.day) {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${specificDay.emoji} ${specificDay.content}\n${specificDay.link}`;
				
				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});

				publishedTweets.push(tweet);
			} else if (sp[1] === '2' && daysOfMonth[1] && daysOfMonth[1] === now.day) {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${specificDay.emoji} ${specificDay.content}\n${specificDay.link}`;
				
				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});

				publishedTweets.push(tweet);
			} else if (sp[1] === '3' && daysOfMonth[2] && daysOfMonth[2] === now.day) {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${specificDay.emoji} ${specificDay.content}\n${specificDay.link}`;

				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});

				publishedTweets.push(tweet);
			} else if (sp[1] === '4' && daysOfMonth[3] && daysOfMonth[3] === now.day) {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${specificDay.emoji} ${specificDay.content}\n${specificDay.link}`;
				
				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});

				publishedTweets.push(tweet);
			} else if (sp[1] === 'last' && daysOfMonth[daysOfMonth.length - 1] && daysOfMonth[daysOfMonth.length - 1] === now.day) {
				const tweet = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}\n\n${specificDay.emoji} ${specificDay.content}\n${specificDay.link}`;

				client.post('statuses/update', {status: tweet}, (error, tweetData, response) => {
					if (error) console.log(error);
				});

				publishedTweets.push(tweet);
			}
		})
	}

	return publishedTweets;
}

console.log(publishTweets(days, specificDays));
