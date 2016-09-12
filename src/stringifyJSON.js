var stringifyJSON = function(obj) {
	var result;
	var isFirst = true;

	if(typeof obj === "undefined" || typeof obj === "function"){
		return "";
	}

	if(obj === null){
    	return "" + obj + "";
  	}

  	if(typeof obj === "string"){
  		return "\"" + obj + "\"";
  	}

  	if(typeof obj !== "object"){
  		return "" + obj + "";
  	}

  	if(Array.isArray(obj)){
  		result = [];
  		_.each(obj, function(item){
  			result.push(stringifyJSON(item));
  		})

  		return "[" + result + "]";
  	}

  	if(typeof obj === "object"){
  		result = "";
  		var temp = [];
  		_.each(obj, function(item, key){
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
