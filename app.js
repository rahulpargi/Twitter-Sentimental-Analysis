var StreamTweets=require('stream-tweets')
const vader=require('vader-sentiment');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";
var credentials=require('./api-keys').twitterKeys;
var st=new StreamTweets(credentials,false);
var placeLookup = require('place-lookup');
var apiKey = "APIKEY";
var lat="";
var lon="";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var a=db.db("twitter");
    
    st.stream("bitcoin",function(result){
    var data=result.text;
    var sen=vader.SentimentIntensityAnalyzer.polarity_scores(data);
    //extracting keywords

    
    //converting timestamp to  date
    var date = new Date(result.timestamp_ms*1000);
    var hours=date.getHours();
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2);
    var text=result.text;
    var i=0;
    
    //getting location
    var geo=result.user.location;
    
    //getting location from  location string
    
    var tz=result.user.time_zone;
    

    var obj=[{created_at:result.created_at,tweet:data,location:geo,sentiment:sen.compound,time_zone:tz}];
    //filter the null and 0 values
    if(geo!=null&&sen.compound!=0&&tz!=null){
    
        a.collection("data").insert(obj,function(err,res){
            if(err) throw err;
            console.log(result);

        });
    }

    });

});


