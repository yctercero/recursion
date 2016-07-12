// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var test = function(claim, message) {
	if (claim) {
		return true;
	} else {
		throw message;
	}
};

var parseJSON = function(json) {
  // Super helpful - http://ronfenolio.com/blog/2016/01/parsing-json/

  var results;
  var currentIndex = 0; //keep track of where in the string we are
  var currentChar = " ";
  var parseMe = json;
  var stringLength = json.length;
  var key;
  var val;
  var str = "";

  
  function getNextChar(){
  	// Funcion gets next charachter
  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
  	// Before I was doubling my work by trying to have one variable keeping tack of the index and then
  	// Having to change i to that index every time, charAt means I can get rid of the loop here

  	// Set the charachter we're at
  	currentChar = parseMe.charAt(currentIndex);
  	console.log(currentChar);
  	// Move index one further, so next time getNextChar is called it grabs that char
  	currentIndex++
  	// Return the current charachter
  	return currentChar;
  };

  
  function getResult(){
  // This should be the function to kick things off
	
	if(currentChar === " "){
		// Want this first and don't want to return because if I add return
		// here like with the others, the process would stop every time it hit
		// a white space
	    parseWhiteSpace();
	}

  	if(currentChar === "["){
        return parseArray();
    } 

    if (currentChar === "{"){
        return parseObject();
    } 

    if (currentChar === "\""){
        return parseString();
    }

    if(currentChar === "n" || currentChar === "t" || currentChar === "f"){
      return parseUnique();
    }

    if(currentChar === "-" || !isNaN(currentChar)){
      return parseNum();
    }
  };

  function parseWhiteSpace(){

  	if(currentChar === " "){
  		return getNextChar();
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

  
  function parseArray(){
  	// Array function
  	// What will ultimately be returned as result
  	var tempArr = [];

  	this.test(currentChar === "[" , "currentChar should be [ inside of parseArray" );

  	getNextChar();

  	if(currentChar === " "){
  		parseWhiteSpace();
  	}

  	// Check if we're dealing with an empty array
  	if(currentChar === "]"){
  		this.test(currentChar === "]" , "currentChar should be ] to indicate an empty array");
  		getNextChar();
  		return tempArr;
  	}

  	// If not an empty array...
  	tempArr.push(getResult());

  	
  	while(currentChar === ","){
  		str = "";
  		getNextChar();
  		tempArr.push(getResult());
  		str = "";
  	}

  	return tempArr;
  };

  
  function parseString(results){
  	// String function
  	getNextChar();

	console.log("current char inside parseString: " + currentChar);

	if(currentChar === " "){
  		parseWhiteSpace();
  	}
  		
	if(currentChar === '"'){
		this.test("currentChar should be ' indicating an empty string.");
		getNextChar();
		return str;
	}
	
	str += currentChar; 	

	//getNextChar();
	parseString();
	console.log("Before retrurning: " + currentChar);
  	return str;
  };

  
  function parseUnique(results){
  	// Boolean & Null function
  	this.test(currentChar === "t" || currentChar === "f" || currentChar === "n", "currentChar should be f or t first time inside of parseUnique, but is instead " + currentChar );
  	
  	str = currentChar;

  	if(currentChar === "n"){
  		while(str !== "null"){
  			str += getNextChar();
  		}

  		this.test(currentChar === "l", "currentChar should be l when while loop ends inside parseUnique, but is instead " + currentChar );
  		
  		getNextChar();
  		return null;
  	}

  	if(currentChar === "t"){
  		while(str !== "true"){
  			str += getNextChar();
  		}

  		this.test(currentChar === "e", "currentChar should be e when while loop ends inside parseUnique, but is instead " + currentChar );
  		
  		getNextChar();
  		return true;
  	}

  	if(currentChar === "f"){
  		while(str !== "false"){
  			str += getNextChar();
  		}

   		this.test(currentChar === "e", "currentChar should be e when while loop ends inside parseUnique, but is instead " + currentChar );
  		
  		getNextChar();
  		return false;
  	}
  };
  
  function parseNum(results){
  	// Number function
  	console.log("current CHAR " + currentChar);
  	str = currentChar;

  	while(currentChar === "-" || currentChar === "." || typeof currentChar === "number"){
  		str += getNextChar();
  		console.log(str);
  	}
  		
  	getNextChar();
  	return Number(str);
  };


  results = getResult();

  return results;
};
