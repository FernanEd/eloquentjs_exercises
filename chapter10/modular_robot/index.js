import ferBot from './ferBot.js';
import goalOrientedRobot from './goalRobot.js';
import randomRobot from './randomRobot.js';
import compareRobots from './robotTesting.js';
import routeRobot from './routeRobot.js';

compareRobots(ferBot, undefined, randomRobot, []);
compareRobots(ferBot, undefined, routeRobot, []);
compareRobots(ferBot, undefined, goalOrientedRobot, []);
