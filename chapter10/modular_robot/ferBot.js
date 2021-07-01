import { findRoute } from './goalRobot.js';
import roadGraph from './roadGraph.js';

export const removeRepeated = (array) => {
	let newArr = [];
	for (let element of array) {
		if (!newArr.includes(element)) {
			newArr.push(element);
		}
	}
	return newArr;
};

export const pickOptimalRoute = (origin, options) => {
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

export default ferBot;
