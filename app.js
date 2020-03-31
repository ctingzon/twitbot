var TwitterPackage = require('twitter');
 
// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: '**********************************',
  consumer_secret: '**********************************',
  access_token_key: '**********************************',
  access_token_secret: '**********************************'
}
 
var Twitter = new TwitterPackage(secret);
 
var query = "chipotle";
Twitter.get('search/tweets', {q: query, count: 4, lang:"en"}, function(error, tweets, response) {
    
   var tweet_list = tweets['statuses'];
   console.log("********")
   console.log(tweet_list)
    
   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        } 
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " you're awesome";
        var tweet_id = tweet_list[i].id_str
 
        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("HELL YEAH WE DID IT!")
            });
        }
 
        catch(err) {
            console.log(err);
        }
   }
});
