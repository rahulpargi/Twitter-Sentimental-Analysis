
var keyword_extractor = require("keyword-extractor");
var removeWords =  require('remove-words');

var sentence = " Back to $8,250, Ethereum Bitcoin and ERC20 Tokens Secure Momentum https://t.co/laJkxmodiy";
 var i=0;

var extraction_result = keyword_extractor.extract(sentence,{
language:"english",
remove_digits: true,
return_changed_case:true,
remove_duplicates: false   
 });

console.log( removeWords(sentence));
                                                        
 
