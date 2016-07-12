// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // Super helpful - http://ronfenolio.com/blog/2016/01/parsing-json/

  var results;
  var keyAt; //keep track of where in the string we are
  var stringLength = json.length;

  // Funcion gets next charachter
  function getNext(string){
  	for (var i = keyAt; i < string.length; i++) {
  		keyAt = i;

  		checkChar(json[keyAt]);
  	}
  }

  // Function that checks whether array, object, or other
  function checkChar(char){
  	if(char === "["){
        results = [];
        return parseArray();
      } else if (char === "{"){
        results = {};
        return parseObject();
      } else{
        return parseElements();
      }
  }

  //Object function
  function parseObject(){
    keyAt++;
    var isfirst = true;
      if(json[keyAt] === "}"){
        keyAt = keyAt + 1;
        return {};
      }

    if(isfirst){
      var key = parseElements();
      isfirst = false;
    }else{
      var val = parseElements();
    }
    // If array has elements check elements
    results[key] = val; 

    getNext(json, keyAt);
  }

  // Array function
  function parseArray(){
  	keyAt++;

  	if(json[keyAt] === "]"){
  		keyAt = keyAt + 1;
  		return [];
  	}

  	// If array has elements check elements
  	console.log(parseElements());
  	getNext(json, keyAt);

  }

  // Elements function
  function parseElements(){
    // check if a string
    if(json[keyAt] !== " " && json[keyAt] !== "," && json[keyAt] === '"'){
      return parseString();
    }

    // check if null
    if(json[keyAt] === "n"){
      return parseNull();
    }

    // check if boolean
    if(json[keyAt] === "t"){
      return Boolean(parseBoolean());
    }

    if(json[keyAt] === "f"){
      return Boolean(parseBoolean());
    }

    //check if array
    if(json[keyAt] === "[" || json[keyAt] === "]"){
      return parseArray();
    }

    if(json[keyAt] === "-" || !isNaN(json[keyAt]) && json[keyAt] !== " " && json[keyAt] !== "," && json[keyAt] !== '"'){
      return parseNum();
    }

    // check if object
    if(json[keyAt] === "{"){
      return parseObject();
    }

  }

  // String function
  function parseString(results){
  	var str = "";
	var initialKey = keyAt;
	var track = 0;

  	for (var i = keyAt + 1; i <= stringLength; i++) {
  		
  		if(i !== initialKey && json[i] === '"'){
  			keyAt += i;
  			return str;
  		}

  		if(json[i] !== " " && json[i] !== "," && json[i] !== "" && json[i] !== '"'){
  			track = i;
  			str += json[i];
  		}
  		
  		keyAt += track;
  		return str;
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
  			//console.log("str in parseNum: " + str);
  		}else{
  			keyAt = i;
  			return Number(str);
  		}
  	}
  } // end parseNum()

  getNext(json, keyAt);

  return results;
};
