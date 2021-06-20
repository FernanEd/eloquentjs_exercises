class PGroup {
	constructor(items) {
		this.content = [...items];
	}

	has(element) {
		return this.content.includes(element);
	}

	add(element) {
		if (!this.has(element)) {
			return new PGroup([...this.content, element]);
		}
	}

	delete(element) {
		if (this.has(element)) {
			return new PGroup([
				...this.content.filter((prevElement) => prevElement != element),
			]);
		}
	}
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
