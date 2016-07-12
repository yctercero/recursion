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

    if(currentChar === "n"){
      return parseNull();
    }

    if(currentChar === "t"){
      return parseBoolean();
    }

    if(currentChar === "f"){
      return parseBoolean();
    }

    if(currentChar === "-" || !isNaN(currentChar)){
      return parseNum();
    }

    

  };

  function parseWhiteSpace(){

  	if(currentChar === " "){
  		return getNextChar();
  	}

  }

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
  }; // end parseString()


  
  function parseNull(results){
  	// Null function
  	this.test(currentChar === "n" , "currentChar should be n first time inside of parseNull" );
  	str = currentChar;
  	while(str !== "null"){
  		str += getNextChar();
  	}

  	this.test(currentChar === "l" , "currentChar should be l when while loop ends inside parseNull" );
  	
  	getNextChar();
  	return null;
  }; //end parseNull()


  
  function parseBoolean(results){
  	// Boolean function
  	console.log("THE CURRENT IS " + currentChar);
  	this.test(currentChar === "t" || currentChar === "f" , "currentChar should be f or t first time inside of parseBoolean, but is instead " + currentChar );
  	
  	str = currentChar;

  	if(currentChar === "t"){
  		while(str !== "true"){
  			str += getNextChar();
  		}

  		this.test(currentChar === "e", "currentChar should be e when while loop ends inside parseBoolean" );
  		
  		getNextChar();
  		return true;
  	}

  	if(currentChar === "f"){
  		while(str !== "false"){
  			str += getNextChar();
  		}

   		this.test(currentChar === "e", "currentChar should be e when while loop ends inside parseBoolean" );
  		
  		getNextChar();
  		return false;
  	}

  }; // end parseBoolean()


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

  results = getResult();

  return results;
};
