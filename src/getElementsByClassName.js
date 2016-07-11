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
  function checkEls(results, className, node){
  	var node = node || document.body;

  	// if the node has classes on it...
  	if(node.classList){
  		// check if one of those classes matches className
  		if(node.classList.contains(className)){
  			// if it does, push that node into results
  			results.push(node);

  			return results;
  		}
  	}

  	// if the node has child elements...
  	if(node.children){
  		// collect the child elements
  		var childNodesList = node.childNodes;
  		// iterate through the list of children using each
  		_.each(childNodesList, function(item, key, collection){
  			// if the child node is an element, as childNodes includes ALL nodes
  			// http://www.w3schools.com/jsref/prop_node_nodetype.asp
  			if(item.nodeType === 1){
  				// for each child call checkEls again
  				checkEls(results, className, item);
  			}
  		})
  		// Before was returning results outside of this statement
  		// which was one of the problems
  		return results;
  	}
  }

  // to kick things off
  checkEls(results, className, document.body);

  return results;
  //we're creating a function that takes in a class name as an argument
  //we want to get all the nodes/elements in the doc and traverse through them
  //we know we can get the body element with document.body
  //and all it's children with document.childNodes

  //as we loop through the collection of elements we want to check 2 things:
    //1 - does this parent element have the class we're looking for
      //in which case we ant to add it to the results that will be returned
    //2 - does it have any children we need to loop through again (recursion here)
};
