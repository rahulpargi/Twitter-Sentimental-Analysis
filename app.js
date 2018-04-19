var StreamTweets=require('stream-tweets')
const vader=require('vader-sentiment');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017";



var credentials=require('./api-keys').twitterKeys;
var st=new StreamTweets(credentials,false);

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var a=db.db("twitter");
    st.stream("bitcoin,ripple",function(result){
    var data=result.text;
    var sen=vader.SentimentIntensityAnalyzer.polarity_scores(data);
    //converting timestamp to  date
    var date = new Date(result.timestamp_ms*1000);
    var hours=date.getHours();
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(result);
    //getting location
    var geo=result.user.location;
    var obj=[{tweet:data,location:geo,sentiment:sen.compound,time:formattedTime}];
   // console.log(obj);
    a.collection("data").insert(obj,function(err,res){
        if(err) throw err;


    });


    });

});


