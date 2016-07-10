// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
 var element = document.body;

  var children = element.childNodes;
  console.log(children);
  var result = [];

  if(element.hasChildNodes()){
    return console.log("has child nodes");
  } else{
    return console.log("does not have child nodes");
  }
};
