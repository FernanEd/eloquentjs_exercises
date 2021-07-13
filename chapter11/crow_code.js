import { bigOak } from './crow-tech';

bigOak.readStorage('food caches', (caches) => {
	let firstCache = caches[0];
	bigOak.readStorage(firstCache, (info) => {
		console.log(info);
	});
});

// bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
//             () => console.log("Note delivered."));

import { defineRequestType } from './crow-tech';

defineRequestType('note', (nest, content, source, done) => {
	console.log(`${nest.name} received note: ${content}`);
	done();
});

function storage(nest, name) {
	return new Promise((resolve) => {
		nest.readStorage(name, (result) => resolve(result));
	});
}

storage(bigOak, 'enemies').then((value) => console.log('Got', value));

function requestType(name, handler) {
	defineRequestType(name, (nest, content, source, callback) => {
		try {
			Promise.resolve(handler(nest, content, source)).then(
				(response) => callback(null, response),
				(failure) => callback(failure)
			);
		} catch (exception) {
			callback(exception);
		}
	});
}

requestType('ping', () => 'pong');

function availableNeighbors(nest) {
	let requests = nest.neighbors.map((neighbor) => {
		return request(nest, neighbor, 'ping').then(
			() => true,
			() => false
		);
	});
	return Promise.all(requests).then((result) => {
		return nest.neighbors.filter((_, i) => result[i]);
	});
}
