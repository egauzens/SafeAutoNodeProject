const fs = require("fs");
const readline = require("readline");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");

async function parseInput() {
	const fileStream = fs.createReadStream("./inputData/inputFile.txt");
	fileStream.setEncoding("UTF8");
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	var drivers = [];
	var error = "";

	for await (const line of rl) {
		var rawInput = line.replace(new RegExp(":", "g"), ".");
		var input = rawInput.split(" ");
		var command = input[0].toLowerCase();

		switch (command) {
			case "driver":
				if (input.length != 2) {
					error =
						"Driver command contains wrong number of parameter(s)";
				} else {
					var name = input[1];
					// Not sure if it's an error if a driver has been declared multiple times, but if it is error can be set here
					if (
						drivers.findIndex((value) => {
							return value.name === name;
						}) === -1
					) {
						drivers = [...drivers, new Driver(name)];
					}
				}
				break;
			case "trip":
				if (input.length != 5) {
					error =
						"Trip command contains wrong number of parameter(s)";
				} else {
					var name = input[1];
					if (
						drivers.findIndex((value) => {
							return value.name === name;
						}) === -1
					) {
						error =
							"Driver must first be registered before assigning them a trip!";
						break;
					}
					var startTime = Number.parseFloat(input[2]);
					var stopTime = Number.parseFloat(input[3]);
					var milesDriven = Number.parseFloat(input[4]);
					if (
						isNaN(startTime) ||
						isNaN(stopTime) ||
						isNaN(milesDriven)
					) {
						error = "Trip command contains invalid parameter(s)";
					} else {
						var driver = drivers.find((value) => {
							return value.name === name;
						});

						var trip = new Trip(
							name,
							startTime,
							stopTime,
							milesDriven
						);

						driver.addTrip(trip);
					}
				}
				break;
			default:
				error = "Input file contains invalid command(s)!";
				break;
		}
	}

	return {
		drivers: drivers,
		error: error,
	};
}

module.exports.parseInput = parseInput;
