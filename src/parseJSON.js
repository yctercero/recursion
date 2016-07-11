// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // Super helpful - http://ronfenolio.com/blog/2016/01/parsing-json/

  var results;
  var keyAt; //keep track of where in the string we are
  var stringLength = json.length;

  each(json, function(item, key, collection){

  	if(item === "["){
  		keyAt = key;
  		parseArray(item, keyAt);
  	}

  });

  //Object function

  // Array function
  function parseArray(item, keyAt){
  	for (var i = keyAt; i <= stringLength; i++) {
  		
  		console.log(json[i]);

  		if(json[i] === "]"){
  			results = [];
  		}
  		
  	}
  }

  // String function


  return results;
};
