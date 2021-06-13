//Lmao
const range = (min, max, step = 1) => {
	let array = [];
	for (
		let i = 0, limit = (max - min) / step, n = min;
		i <= limit;
		i++, n += step
	) {
		array.push(n);
	}
	return array;
};

const sum = (numbers) => numbers.reduce((prev, next) => prev + next, 0);

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(1, 10, 2));
// → [1, 3, 5, 7, 9]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
