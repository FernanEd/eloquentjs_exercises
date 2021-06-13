const reverseArray = (array) =>
	array.map((_, i) => array[array.length - 1 - i]);

const reverseArrayInPlace = (array) => {
	for (let i = 0; i < array.length / 2; i++) {
		let shifted = array[i];
		array[i] = array[array.length - 1 - i];
		array[array.length - 1 - i] = shifted;
	}
};

console.log(reverseArray(['A', 'B', 'C']));
// → ["C", "B", "A"];

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
