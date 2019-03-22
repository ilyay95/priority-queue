class Node {
	
	constructor(data, priority) {
		
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		
		if (node == null) return;

		if(this.left == null) {
			this.left = node;
			node.parent = this;
			return;
		}

		if(this.right == null)	{
			this.right = node;
			node.parent = this;
			return;
		}
	}

	removeChild(node) {
		
		if (this.left == node) {
			this.left = null;
			node.parent = null;
			return;
		} 

		if (this.right == node) {
			this.right = null;
			node.parent = null;
			return;
		}

		throw new Error("Error from node.removeChild");
	}

	remove() {
		
		if (this.parent !== null) 
			this.parent.removeChild(this);
	}

	swapWithParent() {
		
		var	childNode = this;
		var parentNode = this.parent;
		var	tempNode = null;
		var	marker = null;

		if (parentNode !== null){
			
			if (parentNode.left == childNode){
				tempNode = parentNode.right;
				marker = NaN;
			}
			else if (parentNode.right == childNode){
				tempNode = parentNode.left;
			}
		}else return;
		
		if (parentNode.parent !== null){
			
			if (parentNode == parentNode.parent.right){
				parentNode.parent.right = childNode;
			} else parentNode.parent.left = childNode;		
		}

		if (this.left !== null) this.left.parent = this.parent;
		if (this.right !== null) this.right.parent = this.parent;
		
		this.parent.left = this.left;
		this.parent.right = this.right;
		this.parent = parentNode.parent;
		parentNode.parent = childNode;

		if (tempNode !== null) tempNode.parent = childNode;

		if (marker !== null){
			childNode.right = tempNode;
			childNode.left = parentNode;
		}
		else {
			childNode.left = tempNode;
			childNode.right = parentNode;
		}
	}
}

module.exports = Node;