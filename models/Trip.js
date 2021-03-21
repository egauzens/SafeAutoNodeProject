module.exports = class Trip {
	constructor(name, start, stop, miles) {
		this.driverName = name;
		this.startTime = start;
		this.stopTime = stop;
		this.milesDriven = miles;

		this.setTripLengthInHours();
	}

	setTripLengthInHours() {
		var time = this.stopTime - this.startTime;
		var minutes = (time % 1) * 100;
		this.tripLengthInHours = Math.trunc(time) + minutes / 60.0;
	}

	shouldBeAdded() {
		var mph = this.milesDriven / this.tripLengthInHours;

		return mph > 5 && mph < 100;
	}
};
