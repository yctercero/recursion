// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if(typeof obj === "string" || typeof obj === "boolean" || typeof obj === "number"){
    return "'" + obj + "'";
  }

  var final;

  if(typeof obj === "object"){
    var result = reduce(obj, function(startVal, item, key){
      var str = "'" + key + "'";
      var startVal;
      var recurse = false;
      if(typeof item === "object"){
        recurse = true;
        startVal[key] = stringifyJSON(item);
        console.log("1:" + JSON.stringify(startVal));
        console.log("2:" + JSON.stringify(startVal[key]));
        recurse = false;
        return startVal;
      } else if(typeof item === "string"){
        item = "" + item + "";
      }

      startVal[str] = item;
      console.log("3:" + JSON.stringify(startVal));
      //console.log(startVal);
      if(recurse === false){
      	return startVal;
      }
      
    }, {})
	console.log(result);
  	return result;
  }
  



  
};
