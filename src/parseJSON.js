// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // Super helpful - http://ronfenolio.com/blog/2016/01/parsing-json/

  var results;
  var keyAt; //keep track of where in the string we are
  var stringLength = json.length;

  _.each(json, function(item, key, collection){

  	if(item === "["){
  		keyAt = Number(key) + 1;
  		results = [];
  		parseArray(results);
  	}

  });

  //Object function

  // Array function
  function parseArray(results){
  	for (var i = keyAt; i <= stringLength; i++) {
  		
  		// if empty array, just return empty array immediately
  		if(json[i] === "]"){
  			return results;
  		}

  		// if looking like value could possibly be null
  		if(json[i] === "n"){
  			keyAt = i;
  			console.log("Before parseNull called: " + keyAt);
  			results.push(parseNull(results));
  			i = keyAt;
  			console.log("After parseNull called: " + keyAt);
  		}

  		// If looking like value could be true
  		if(json[i] === "t"){
  			keyAt = i;
  			console.log("Before parseBoolean for t called: " + keyAt);
  			results.push(Boolean(parseBoolean(results)));
  			i = keyAt;
  			console.log("After parseBoolean for t called: " + keyAt);
  		}

  		// If looking like value could be false
  		if(json[i] === "f"){
  			keyAt = i;
  			console.log("Before parseBoolean for f called: " + keyAt);
  			results.push(Boolean(parseBoolean(results)));
  			i = keyAt;
  			console.log("After parseBoolean for f called: " + keyAt);
  		}

  		// If encounter a number
  		if(!isNaN(json[i]) && json[i] !== " " && json[i] !== "," && json[i] !== '"'){
  			keyAt = i;
  			results.push(parseNum(results));
  			i = keyAt;
  		}

  		// If encounter a quotation mark, as to indicate a string
  		if(json[i] !== " " && json[i] !== "," && json[i] === '"'){
  			keyAt = i;
  			console.log("key before parseString called " + i);
  			results.push(parseString(results));
  			i = keyAt;
  			console.log("key after parseString called " + i);
  		}

  	}
  }

  // String function
  function parseString(results){
  	var str = "";
	var initialKey = keyAt;

  	for (var i = keyAt + 1; i <= stringLength; i++) {
  		
  		if(i !== initialKey && json[i] === '"'){
  			// Before was just adding 1 to keyAt which was not making any difference
  			keyAt += i;
  			return str;
  		}

  		if(json[i] !== " " && json[i] !== "," && json[i] !== "" && json[i] !== '"'){
  			str += json[i];
  		}
  		
  	}

  	return str;
  } // end parseString()


  // Null function
  function parseNull(results){
  	var str = "";

  	for(var i = keyAt; i <= keyAt + 3; i++){
  		str += json[i];
  		if(str === "null"){
  			keyAt = i;
  			return null;
  		}
  	}
  } //end parseNull()


  // Boolean function
  function parseBoolean(results){
  	var str = "";

  	// i < keyAt + 5 because that's max you'd need to check to know if true or false
  	for (var i = keyAt; i < keyAt + 5; i++) {
  		str += json[i];

  		if(str === "true"){
  			keyAt = i;
  			console.log("key before parseBoolean returns for true: " + keyAt);
  			return Number(1);
  		}

  		if(str === "false"){
  			keyAt = i;
  			console.log("key before parseBoolean returns for false: " + keyAt);
  			return Number(0);
  		}
  	}
  } // end parseBoolean()


  // Number function
  function parseNum(results){
  	var str = "";

  	for (var i = keyAt; i <= stringLength; i++) {
  		if(json[i] === "." || json[i] === "-" || !isNaN(json[i])){
  			str += json[i];
  			console.log("str in parseNum: " + str);
  		}else{
  			keyAt = i;
  			return Number(str);
  		}
  	}

  	
  } // end parseNum()


  return results;
};
