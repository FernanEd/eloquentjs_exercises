let size = 8;
let blackSquare = false;
for (let i = 0; i < size; i++) {
	let row = '';
	blackSquare = !blackSquare;
	for (let j = 0; j < size; j++) {
		blackSquare = !blackSquare;
		row += blackSquare ? '#' : ' ';
	}
	console.log(row);
}
