const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = (typeof maxSize === 'undefined')? 30 : maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.size() == this.maxSize)
			throw new Error();
		this.heap.push(data, priority);

	}

	shift() {
		if(this.isEmpty())
			throw new Error();
		let removed = this.heap.pop();
		return removed;

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.size() == 0;
	}
}

module.exports = PriorityQueue;