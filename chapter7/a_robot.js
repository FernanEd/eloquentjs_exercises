const roads = [
	"Alice's House-Bob's House",
	"Alice's House-Cabin",
	"Alice's House-Post Office",
	"Bob's House-Town Hall",
	"Daria's House-Ernie's House",
	"Daria's House-Town Hall",
	"Ernie's House-Grete's House",
	"Grete's House-Farm",
	"Grete's House-Shop",
	'Marketplace-Farm',
	'Marketplace-Post Office',
	'Marketplace-Shop',
	'Marketplace-Town Hall',
	'Shop-Town Hall',
];

function buildGraph(edges) {
	let graph = Object.create(null);
	function addEdge(from, to) {
		if (graph[from] == null) {
			graph[from] = [to];
		} else {
			graph[from].push(to);
		}
	}
	for (let [from, to] of edges.map((r) => r.split('-'))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
	constructor(place, parcels) {
		this.place = place;
		this.parcels = parcels;
	}

	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let parcels = this.parcels
				.map((p) => {
					if (p.place != this.place) return p;
					return { place: destination, address: p.address };
				})
				.filter((p) => p.place != p.address);
			return new VillageState(destination, parcels);
		}
	}
}

VillageState.random = function (parcelCount = 5) {
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		let address = randomPick(Object.keys(roadGraph));
		let place;
		do {
			place = randomPick(Object.keys(roadGraph));
		} while (place == address);
		parcels.push({ place, address });
	}
	return new VillageState('Post Office', parcels);
};

function runRobot(state, robot, memory) {
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

function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}

function randomRobot(state) {
	return { direction: randomPick(roadGraph[state.place]) };
}

// runRobot(VillageState.random(), randomRobot);

const mailRoute = [
	"Alice's House",
	'Cabin',
	"Alice's House",
	"Bob's House",
	'Town Hall',
	"Daria's House",
	"Ernie's House",
	"Grete's House",
	'Shop',
	"Grete's House",
	'Farm',
	'Marketplace',
	'Post Office',
];

function routeRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;
	}
	return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph, from, to) {
	let work = [{ at: from, route: [] }];
	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i];
		for (let place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some((w) => w.at == place)) {
				work.push({ at: place, route: route.concat(place) });
			}
		}
	}
}

function goalOrientedRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), goalOrientedRobot, []);

const removeRepeated = (array) => {
	let newArr = [];
	for (let element of array) {
		if (!newArr.includes(element)) {
			newArr.push(element);
		}
	}
	return newArr;
};

const pickOptimalRoute = (origin, options) => {
	let optimalRoute = [...Array(12)];
	for (let destination of options) {
		let newRoute = findRoute(roadGraph, origin, destination);
		if (newRoute.length < optimalRoute.length) {
			optimalRoute = newRoute;
		}
	}
	return optimalRoute;
};

const ferBot = ({ place, parcels }, memory) => {
	if (!memory) {
		memory = {
			pickupPlaces: removeRepeated(parcels.map((p) => p.place)),
			deliveringPlaces: removeRepeated(parcels.map((p) => p.address)),
			currentRoute: [],
		};
	}

	if (memory.currentRoute.length == 0) {
		if (memory.pickupPlaces.length > 0) {
			let route = pickOptimalRoute(place, memory.pickupPlaces);
			memory.pickupPlaces = memory.pickupPlaces.filter(
				(p) => p !== route[route.length - 1]
			);
			memory.currentRoute = route;
		} else {
			let route = pickOptimalRoute(place, memory.deliveringPlaces);
			memory.deliveringPlaces = memory.deliveringPlaces.filter(
				(p) => p !== route[route.length - 1]
			);
			memory.currentRoute = route;
		}
	}

	return {
		direction: memory.currentRoute[0],
		memory: { ...memory, currentRoute: memory.currentRoute.slice(1) },
	};
};

function testRobot(turns, state, robot, memory) {
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

function checkRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			return turn;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
	}
}

const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

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

compareRobots(ferBot, undefined, randomRobot, []);
compareRobots(ferBot, undefined, routeRobot, []);
compareRobots(ferBot, undefined, goalOrientedRobot, []);
