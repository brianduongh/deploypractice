import React from "react";
import "./style.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";

function Navs(props){

		return (
			<div>
				<Navbar>

					<Navbar.Header>
						<Navbar.Brand>
							<a href="/" id ="brand">
								{props.page}
							</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} href="/dashboard" style={props.style}>
								Dashboard
							</NavItem>
							<NavItem eventKey={2} href="/profile" style={props.style}>
								Profile
							</NavItem>
							<NavItem eventKey={3} href="/signout" style={props.style}>
								Sign Out
							</NavItem>
						</Nav>
					</Navbar.Collapse>

				</Navbar>
			</div>
		)
	// }
// }
}

export default Navs;
