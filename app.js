var TwitterPackage = require('twitter');
var config = require('./config');

/*---------- config looks like---------
*
* {
*   "consumer_key": "...",
*   "consumer_secret": "...",
*   "access_token_key": "...",
*   "access_token_secret": "..."
* }
*
*------------------------------------*/

var keys = {
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
}
var Twitter = new TwitterPackage(keys);

Twitter.post('statuses/update', {status: 'Hello Friend! Hello!'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});