// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if(typeof obj === "string" || typeof obj === "boolean" || typeof obj === "number"){
    result = "'" + obj + "'";
  }

  // var dict = {
  //   true: "'true'",
  //   false: "'false'",
  //   number: 
  // }

  var final;

  if(typeof obj === "object"){
    var result = reduce(obj, function(startVal, item, key){
      var str = "'" + key + "'";
      var startVal;
      if(typeof item === "object"){
        //startVal = startVal[key];
        startVal[key] = stringifyJSON(item);
        console.log("1:" + JSON.stringify(startVal));
        console.log("2:" + JSON.stringify(startVal[key]));
        //startVal[key] = 
      } else if(typeof item === "string"){
        item = "" + item + "";
      }

      startVal[str] = item;
      console.log("3:" + JSON.stringify(startVal));
      //console.log(startVal);
      return startVal;
    }, {})
  }
  



  console.log(result);
  return result;
};
