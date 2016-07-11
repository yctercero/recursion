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
    result.push("has child nodes");
    return console.log(result);
  } else{
    result.push("does not have child nodes");
    return console.log(result);
  }

  //we're creating a function that takes in a class name as an argument
  //we want to get all the nodes/elements in the doc and traverse through them
  //we know we can get the body element with document.body
  //and all it's children with document.childNodes

  //as we loop through the collection of elements we want to check 2 things:
    //1 - does this parent element have the class we're looking for
      //in which case we ant to add it to the results that will be returned
    //2 - does it have any children we need to loop through again (recursion here)
};
