import VillageState from './VillageState.js';

export function runRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}

export function testRobot(turns, state, robot, memory) {
	for (let turn = 0; turn < turns; turn++) {
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}

export function checkRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			return turn;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
	}
}

export const average = (array) =>
	array.reduce((a, b) => a + b, 0) / array.length;

function compareRobots(robot1, memory1, robot2, memory2) {
	let state;
	let tests = 0;
	let robot1Scores = [];
	let robot2Scores = [];
	while (tests < 10000) {
		state = VillageState.random();
		robot1Scores.push(checkRobot(state, robot1, memory1));
		robot2Scores.push(checkRobot(state, robot2, memory2));
		tests++;
	}

	console.log(`
    Robot 1 ends with average ${average(robot1Scores)} turns.
    Robot 2 ends with average ${average(robot2Scores)} turns.
  `);
}

export default compareRobots;
