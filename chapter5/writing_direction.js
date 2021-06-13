const SCRIPTS = require('./scripts');

const characterScript = (code) => {
	for (let script of SCRIPTS) {
		if (
			script.ranges.some(([from, to]) => {
				return code >= from && code < to;
			})
		) {
			return script;
		}
	}
	return null;
};

const dominantDirection = (text) => {
	// Your code here.
	let counter = {};
	for (let i in text) {
		let script = characterScript(text.charCodeAt(i));
		let direction = script ? script.direction : null;
		if (direction in counter) {
			counter[direction]++;
		} else {
			counter[direction] = 0;
		}
	}
	return Object.keys(counter).reduce((lastKey, key) =>
		counter[lastKey] < counter[key] ? key : lastKey
	);
};

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl
