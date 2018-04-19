var StreamTweets=require('stream-tweets')
const vader=require('vader-sentiment');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";



var credentials=require('./api-keys').twitterKeys;
var st=new StreamTweets(credentials,false);


MongoClient.connect(url,function(err,db){
if(err) throw err;
var dbo=db.db("twitter");

st.stream('bitcoin,ripple',function(result){
    var myobj=result;
    var sent=vader.SentimentIntensityAnalyzerSentiment.polarity_scores(result)
    dbo.collection("customers").insertOne(result,function(err,res){
        if (err) throw err;
        
        
    }); 
});

});
