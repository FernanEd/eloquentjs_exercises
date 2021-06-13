// const every = (array, test) => {
// 	for (let value of array) {
// 		if (!test(value)) {
// 			return false;
// 		}
// 	}
// 	return true;
// };

const every = (array, test) => !array.some((value) => !test(value));

console.log(every([1, 3, 5], (n) => n < 10));
// → true
console.log(every([2, 4, 16], (n) => n < 10));
// → false
console.log(every([], (n) => n < 10));
// → true
