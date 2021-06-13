const arrayToList = (array) => {
	let list = null;
	for (let i = array.length - 1; i >= 0; i--) {
		list = {
			value: array[i],
			rest: list,
		};
	}
	return list;
};

const listToArray = (list) => {
	let array = [];
	for (let node = list; node; node = node.rest) {
		array.push(node.value);
	}
	return array;
};

const prepend = (element, list) => {
	return {
		value: element,
		rest: list,
	};
};

const nth = (list, index) => {
	for (let node = list, i = 0; node; node = node.rest, i++) {
		if (i === index) {
			return node.value;
		}
	}
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
