import React, { Component } from "react";
import { fetchReportInput } from "../api/ReportRequests";

class Report extends Component {
	constructor(props) {
		super(props);
		this.state = { drivers: [], loading: false, error: "" };
	}

	renderReport() {
		this.state.drivers.sort((a, b) =>
			a.totalMiles > b.totalMiles ? -1 : 1
		);
		return (
			<div>
				{this.state.drivers.length > 0 ? (
					<table
						className="table striped"
						aria-labelledby="tabelLabel">
						<thead>
							<tr>
								<th>Name</th>
								<th>Miles</th>
								<th>MPH</th>
							</tr>
						</thead>
						<tbody>
							{this.state.drivers.map((driver) => (
								<tr key={driver.name}>
									<td>{driver.name}</td>
									<td>{Math.round(driver.totalMiles)}</td>
									<td>{Math.round(driver.averageMph)}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					"Report not yet generated!"
				)}
			</div>
		);
	}

	render() {
		let content;
		if (this.state.error !== "") {
			content = (
				<p className="red-text">
					<em>{this.state.error}</em>
				</p>
			);
		} else {
			content = this.state.loading ? (
				<p>
					<em>Generating Report...</em>
				</p>
			) : (
				this.renderReport()
			);
		}

		return (
			<div>
				<h1>Report Generator</h1>
				{content}
				<button
					className="btn btn-primary"
					onClick={async () => await this.generateReport()}>
					Generate Report
				</button>
			</div>
		);
	}

	async generateReport() {
		this.setState({ loading: true });
		const response = await fetchReportInput();
		const data = response.data;
		this.setState({
			drivers: data.drivers,
			loading: false,
			error: data.error,
		});
	}
}

export default Report;
