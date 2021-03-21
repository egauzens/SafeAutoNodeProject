import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={"/"}
						className="left brand-logo"
						style={{ marginLeft: "20px" }}>
						SafeAutoProject
					</Link>
					<ul id="nav-mobile" className="right">
						<Link
							to={"/report"}
							id="nav-mobile"
							className="right"
							style={{ marginRight: "20px" }}>
							View Report
						</Link>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
