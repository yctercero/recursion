var getElementsByClassName = function(className){
  // results will be the collection of elements with the matching class
  var results = [];

  function checkEls(results, className, node){
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
  	if(node.childNodes){
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
  		
  		return results;
  	}
  }

  // to kick things off
  checkEls(results, className, document.body);

  return results;

};
