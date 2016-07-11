// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // results will be the collection of elements with the matching class
  var results = [];

  // Before I'd been trying to call getElementsByClassName on itself, but this does
  // not work, or did not work for me because each time the node it would be examining
  // was whatever it had first been set to, which in my case was the body
  function checkEls(className, node){
  	var node = node || document.body;

  	// if the node has classes on it...
  	if(node.classList){
  		// check if one of those classes matches className
  		if(node.classList.contains(className)){
  			// if it does, push that node into results
  			results.push(node);
  		}
  	}

  	// if the node has child elements...
  	if(node.children){
  		// collect the child elements
  		var childNodesList = node.childNodes;
  		// iterate through the list of children using each
  		each(childNodesList, function(item, key, collection){
  			if(item.nodeType === 1){
  				checkEls(className, item);
  			}
  		})
  	}
  }

  return results;
 // var element = document.body;

 //  var children = element.childNodes;
 //  console.log(children);
 //  var result = [];

 //  if(element.hasChildNodes()){
 //    result.push("has child nodes");
 //    return console.log(result);
 //  } else{
 //    result.push("does not have child nodes");
 //    return console.log(result);
 //  }

  //we're creating a function that takes in a class name as an argument
  //we want to get all the nodes/elements in the doc and traverse through them
  //we know we can get the body element with document.body
  //and all it's children with document.childNodes

  //as we loop through the collection of elements we want to check 2 things:
    //1 - does this parent element have the class we're looking for
      //in which case we ant to add it to the results that will be returned
    //2 - does it have any children we need to loop through again (recursion here)
};
