// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // Super helpful - http://ronfenolio.com/blog/2016/01/parsing-json/

  var results;
  var currentIndex = 0; //keep track of where in the string we are
  var currentChar = " ";
  var parseMe = json;
  var stringLength = json.length;
  var key;
  var val;

  // Funcion gets next charachter
  function getNextChar(){
  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
  	// Before I was doubling my work by trying to have one variable keeping tack of the index and then
  	// Having to change i to that index every time, charAt means I can get rid of the loop here

  	// Set the charachter we're at
  	currentChar = json.charAt(currentIndex);

  	// Move index one further, so next time getNextChar is called it grabs that char
  	currentIndex++

  	// Return the current charachter
  	return currentChar;
  }

  // This should be the function to kick things off
  function getResult(){
  	if(currentChar === "["){
        return parseArray();
    } 

    else if (currentChar === "{"){
        return parseObject();
    } 

    else if (currentChar === "\""){
        return parseString();
    }

    else if(currentChar === "-" || !isNaN(currentChar)){
      return parseNum();
    }

  };

  //Object function
  function parseObject(){
  	
    currentIndex++;

    // if empty object
	if(json[currentIndex] === "}"){
	    currentIndex = currentIndex + 1;
	    return {};
	}

	objHasPairs();
	console.log("val here is " + val);
    results[key] = val; 

    getNextChar(json, currentIndex);
  }

  	// Object has Pairs
  	function objHasPairs(){

  		parsePair()
  		console.log("val back here is " + val);
	    console.log("key " + currentIndex);
  		console.log("the next char would be: " + json[currentIndex] + " " + json[currentIndex + 1]);
  	}

  		// Pairs
  		function parsePair(){
  			var isfirst = true;

	  		if(isfirst){
		      key = parseString();
		      
		      isfirst = false;
		      console.log("key " + currentIndex);
		    }
		    	
		    	currentIndex++;
		    	console.log("the currentIndex before val " + currentIndex + ", " + json[currentIndex]);
		      val = parseElements();
		      console.log("val is: " + val);
		      
  		}

  // Array function
  function parseArray(){
  	currentIndex++;

  	if(json[currentIndex] === "]"){
  		currentIndex = currentIndex + 1;
  		return [];
  	}

  	// If array has elements check elements
  	console.log(parseElements());
  	getNextChar(json, currentIndex);

  }

  // Elements function
  function parseElements(){
  	console.log(json[currentIndex] + ", " + json[currentIndex + 1]);
  	if(json[currentIndex] === '\"' && json[currentIndex + 1] === '\"'){
  		return '\"\"';
  	}
    // check if a string
    if(json[currentIndex] !== " " && json[currentIndex] !== "," && json[currentIndex] === '"'){
      return parseString();
    }

    // check if null
    if(json[currentIndex] === "n"){
      return parseNull();
    }

    // check if boolean
    if(json[currentIndex] === "t"){
      return Boolean(parseBoolean());
    }

    if(json[currentIndex] === "f"){
      return Boolean(parseBoolean());
    }

    //check if array
    if(json[currentIndex] === "[" || json[currentIndex] === "]"){
      return parseArray();
    }

    if(json[currentIndex] === "-" || !isNaN(json[currentIndex]) && json[currentIndex] !== " " && json[currentIndex] !== "," && json[currentIndex] !== '"'){
      return parseNum();
    }

    // check if object
    if(json[currentIndex] === "{"){
      return parseObject();
    }

  }

  // String function
  function parseString(results){
  	var str = "";
	var initialKey = currentIndex;
	var track = 0;

  	for (var i = currentIndex + 1; i <= stringLength; i++) {
  		
  		if(i !== initialKey && json[i] === '"'){
  			currentIndex += i;
  			return str;
  		}

  		if(json[i] === '\"' && json[i + 1] === '\"'){
	  		return '\"\"';
	  	}

  		if(json[i] !== " " && json[i] !== "," && json[i] !== "" && json[i] !== '"'){
  			track = i;
  			str += json[i];
  		}  		
  	}
  	console.log("key " + currentIndex);
	currentIndex += track;
  	return str;
  } // end parseString()


  // Null function
  function parseNull(results){
  	var str = "";

  	for(var i = currentIndex; i <= currentIndex + 3; i++){
  		str += json[i];
  		if(str === "null"){
  			currentIndex = i;
  			return null;
  		}
  	}
  } //end parseNull()


  // Boolean function
  function parseBoolean(results){
  	var str = "";

  	// i < currentIndex + 5 because that's max you'd need to check to know if true or false
  	for (var i = currentIndex; i < currentIndex + 5; i++) {
  		str += json[i];

  		if(str === "true"){
  			currentIndex = i;
  			console.log("key before parseBoolean returns for true: " + currentIndex);
  			return Number(1);
  		}

  		if(str === "false"){
  			currentIndex = i;
  			console.log("key before parseBoolean returns for false: " + currentIndex);
  			return Number(0);
  		}
  	}
  } // end parseBoolean()


  // Number function
  function parseNum(results){
  	var str = "";

  	for (var i = currentIndex; i <= stringLength; i++) {
  		if(json[i] === "." || json[i] === "-" || !isNaN(json[i])){
  			str += json[i];
  			//console.log("str in parseNum: " + str);
  		}else{
  			currentIndex = i;
  			return Number(str);
  		}
  	}
  } // end parseNum()

  getNextChar(json, currentIndex);

  return results;
};
