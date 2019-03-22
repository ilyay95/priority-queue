
const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];

    this.heapSize = 0;
  }

  
  static isParent(node) {
    return node.left === null || node.right === null;
  }

  
  push(data, priority) {
    var node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
    this.heapSize++;
  }

  pop() {
    var detachedNode = this.detachRoot();
    if (detachedNode !== null) {
      var root = this.restoreRootFromLastInsertedNode(detachedNode);
      if (root !== null) {
        this.shiftNodeDown(root);
      }
      this.heapSize--;
      return detachedNode.data;
    }
  }

  detachRoot() {
    var root = this.root;
    this.root = null;
    if (this.parentNodes[0] === root) { 
      this.parentNodes.shift();
    }
    return root;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.parentNodes.length == 0) {
      return null;
    }
    var lastInserted = this.parentNodes.pop();
    var parent = lastInserted.parent;
    var prevSParentState = (parent !== null && MaxHeap.isParent(parent)) || parent == detached;
    lastInserted.remove();
    this.root = lastInserted;
    if (detached.left !== lastInserted) {
      lastInserted.appendChild(detached.left);
    }
    if (detached.right !== lastInserted) {
      lastInserted.appendChild(detached.right);
    }
    if (!prevSParentState && parent !== null && MaxHeap.isParent(parent)) {
      this.parentNodes.unshift(parent);
    }
    if (MaxHeap.isParent(lastInserted)) {
      this.parentNodes.unshift(lastInserted);
    }
    return lastInserted;
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return this.heapSize === 0;
  }

  insertNode(node) {
    if (this.parentNodes.length === 0) {
      this.root = node;
      this.parentNodes.push(this.root);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
        this.parentNodes.splice(0, 1);
      }
    }
  }

  shiftNodeUp(node) {
    var parent = node.parent;
    if (parent != null) {
      if (parent.priority < node.priority) {
        var fst = -1;
        var snd = -1;
        if (MaxHeap.isParent(node)) {
          fst = this.parentNodes.indexOf(node);
          if (MaxHeap.isParent(parent)) {
            snd = this.parentNodes.indexOf(parent);
          }
        }
        if (fst != -1) {
          this.parentNodes[fst] = parent;
          if (snd != -1) {
            this.parentNodes[snd] = node;
          }
        }

        if (parent == this.root) {
          this.root = node;
        }
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    }
  }

  shiftNodeDown(node) {
    var child = node.left;
    if (node.right !== null && child.priority < node.right.priority) {
      child = node.right;
    }
    if (child !== null && child.priority > node.priority) {
      var index1 = -1;
      var index2 = -1;
      if (MaxHeap.isParent(child)) {
        index1 = this.parentNodes.indexOf(child);
        if (MaxHeap.isParent(node)) {
          index2 = this.parentNodes.indexOf(node);
        }
      }
      if (index1 !== -1) {
        this.parentNodes[index1] = node;
        if (index2 !== -1) {
          this.parentNodes[index2] = child;
        }
      }

      if (node === this.root) {
        this.root = child;
      }
      child.swapWithParent();
      this.shiftNodeDown(node);
    }
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }
}

module.exports = MaxHeap;