var StreamTweets=require('stream-tweets')
const vader=require('vader-sentiment');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";



var credentials=require('./api-keys').twitterKeys;
var st=new StreamTweets(credentials,false);

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var a=db.db("twitter");
    st.stream('bitcoin,ripple',function(result){
    var tweett=result.text;
    var geo=result.user.location;
    var obj=[{tweet:tweett,location:geo}]
    a.collection("customers").insert(obj,function(err,res){
        if(err) throw err;


    });
});

});


/*
MongoClient.connect(url,function(err,db){
if(err) throw err;
var dbo=db.db("twitter");

st.stream('bitcoin,ripple',function(result){
    var myobj=result;
    var sent=vader.SentimentIntensityAnalyzerSentiment.polarity_scores(result)
    var location=result.user.location;
    dbo.collection("customers").insertOne(result,function(err,res){
        if (err) throw err;
        
        
    }); 
});

});
*/