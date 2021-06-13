const loop = (value, test, update, body) => {
	for (; test(value); value = update(value)) {
		body(value);
	}
};

loop(
	3,
	(n) => n > 0,
	(n) => n - 1,
	console.log
);
// → 3
// → 2
// → 1
