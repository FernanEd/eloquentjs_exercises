const deepEqual = (a, b) => {
	if (typeof a == 'object' && typeof b == 'object') {
		if (a === null || b === null) {
			return a === b;
		}
		let props = [...Object.keys(a), ...Object.keys(b)];
		for (let prop of props) {
			if (!deepEqual(a[prop], b[prop])) {
				return false;
			}
		}
		return true;
	} else {
		return a === b;
	}
};

let obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
