import React from "react";

export default function NavBar() {
	return (
		<nav className="navbar">
			<div className="navbar-inner">
				<a className="navbar-logo" href="#hero">
					<span className="logo-bracket">&#x27E8;</span>
					react-voodoo/
					<span className="logo-bracket">&#x27E9;</span>
				</a>
				<div className="navbar-links">
					<a href="#why">Why</a>
					<a href="#demos">Demos</a>
					<a href="#docs">Docs</a>
					<a href="#samples">Samples</a>
				</div>
				<div className="navbar-actions">
					<a
						className="btn-nav-outline"
						href="https://github.com/react-voodoo/react-voodoo"
						target="_blank"
						rel="noopener"
					>
						GitHub
					</a>
					<a
						className="btn-nav-primary"
						href="https://www.npmjs.com/package/react-voodoo"
						target="_blank"
						rel="noopener"
					>
						npm install
					</a>
				</div>
			</div>
		</nav>
	);
}
