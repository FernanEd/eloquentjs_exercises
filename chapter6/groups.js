class Group {
	// Your code here.
	constructor() {
		this.content = [];
	}

	has(element) {
		return this.content.includes(element);
	}

	add(element) {
		if (!this.has(element)) {
			this.content.push(element);
		}
	}

	delete(element) {
		if (this.has(element)) {
			this.content.splice(this.content.indexOf(element), 1);
		}
	}

	static from(array) {
		let group = new Group();
		for (let element of array) {
			group.add(element);
		}
		return group;
	}

	[Symbol.iterator]() {
		let i = 0;

		return {
			next: () =>
				i == this.content.length
					? { done: true }
					: { value: this.content[i++], done: false },
		};
	}
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(['a', 'b', 'c'])) {
	console.log(value);
}
// → a
// → b
// → c
