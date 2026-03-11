import React       from "react";
import NavBar       from "App/comps/NavBar.js";
import HeroSection  from "App/sections/HeroSection.js";
import DemosSection from "App/sections/DemosSection.js";
import DocSection   from "App/sections/DocSection.js";
import SamplesSection from "App/sections/SamplesSection.js";

export default function App() {
	return (
		<div className="site">
			<NavBar/>
			<HeroSection/>
			<DemosSection/>
			<DocSection/>
			<SamplesSection/>
			<footer className="site-footer">
				<div className="footer-logo">
					<span>&#x27E8;</span>react-voodoo/<span>&#x27E9;</span>
				</div>
				<div className="footer-links">
					<a href="https://github.com/react-voodoo/react-voodoo" target="_blank" rel="noopener">GitHub</a>
					<a href="https://www.npmjs.com/package/react-voodoo" target="_blank" rel="noopener">npm</a>
					<a href="#docs">Docs</a>
					<a href="#demos">Demos</a>
				</div>
				<div className="footer-copy">
					CC-BY-ND 4.0 OR AGPL-3.0-only
				</div>
			</footer>
		</div>
	);
}

module.hot?.accept?.();
