module.exports = class Driver {
	constructor(name) {
		this.name = name;
		this.trips = [];
		this.totalMiles = 0.0;
		this.totalHours = 0.0;
		this.averageMph = 0.0;
	}

	addTrip(trip) {
		if (trip.shouldBeAdded()) {
			this.trips = [...this.trips, trip];
			this.totalMiles += trip.milesDriven;
			this.totalHours += trip.tripLengthInHours;
			this.averageMph = this.totalMiles / this.totalHours;

			return true;
		}

		return false;
	}
};
