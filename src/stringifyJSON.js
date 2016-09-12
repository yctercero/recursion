// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var result;
	var isFirst = true;

	if(typeof obj === "undefined" || typeof obj === "function"){
		//console.log("1");
		return "";
	}

	if(obj === null){
		//console.log("2");
    	return "" + obj + "";
  	}

  	if(typeof obj === "string"){
  		//console.log("3");
  		return "\"" + obj + "\"";
  	}

  	if(typeof obj !== "object"){
  		//console.log("4");
  		return "" + obj + "";
  	}

  	if(Array.isArray(obj)){
  		result = [];
  		//console.log("5");
  		_.each(obj, function(item){
  			result.push(stringifyJSON(item));
  		})

  		return "[" + result + "]";
  	}

  	if(typeof obj === "object"){
  		result = "";
  		var temp = [];
  		//console.log("6");
  		_.each(obj, function(item, key){
  			//key = "\'" + key + "\'";
				var log = stringifyJSON(item);
				if(log === ""){
					result = "";
				} else{
					temp.push("\"" + key + "\"" + ":" + log);
					result = temp.join(',');
				}
  			
  			
  		});

  		return "{" + result + "}";
  	}
 
};
