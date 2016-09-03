var request = require('request');
var TwitterPackage = require('twitter');
var config = require('./config');
var moment = require('moment');
/*---------- config looks like---------
 *
 *   config.twitter.consumer_key = '**************';
 *   config.twitter.consumer_secret = '**************';
 *   config.twitter.access_token_key = '**************';
 *   config.twitter.access_token_sec = '**************';
 *
 *------------------------------------*/
var twitterKeys = {
    consumer_key: config.twitter.consumer_key
    , consumer_secret: config.twitter.consumer_secret
    , access_token_key: config.twitter.access_token_key
    , access_token_secret: config.twitter.access_token_secret
}
var Twitter = new TwitterPackage(twitterKeys);

var options = {
    url: 'https://api.meetup.com/norfolkjs/events?key=' + config.meetup.apikey + '&group_urlname=norfolkjs&sign=true'
    , headers: {
        'Accept': 'application/json'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var status = '@norfolkjs presents: ' + info[0].name + ' on ' + moment(info[0].time).format("MM/DD") + '. RSVP here: ' + info[0].link;
       
        if (status.length <= 140) {
            postToTwitter(status);
        }
    }
}

function postToTwitter(status) {
    Twitter.post('statuses/update', {
        status: status
    }, function (error, tweet, response) {
        if (error) {
            console.log(error);
        }
        console.log(tweet); // Tweet body.
        console.log(response); // Raw response object.
    });
}

request(options, callback);