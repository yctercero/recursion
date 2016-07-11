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
  		parseArray(results, keyAt);
  	}

  });

  //Object function

  // Array function
  function parseArray(results, keyAt){
  	for (var i = keyAt; i <= stringLength; i++) {
  		
  		console.log(json[i]);
  		keyAt = i;

  		if(json[i] === "]"){
  			results = [];
  			return results;
  		}

  		if(json[i] === '"'){
  			results.push(parseString(results, keyAt));
  		}

  	}
  }

  // String function
  function parseString(results, keyAt){
  	var str = "";
	var initialKey = keyAt;

  	for (var i = keyAt + 1; i <= stringLength; i++) {
  		
  		keyAt = i;

  		if(i !== initialKey && json[i] === '"'){
  			return str;
  		}

  		str += json[i];


  	}

  	return str;
  }

  return results;
};
