import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Landing from "./Landing";
import Report from "./Report";

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/report" component={Report} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
