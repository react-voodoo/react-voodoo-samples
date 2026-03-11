import React    from "react";
import ReactDom from "react-dom";
import App      from "App/App.js";

import "./index.scss";

function renderApp() {
	let App                 = require("App/App.js").default;
	document.body.innerHTML = '<div id="app"></div>';
	ReactDom.render(<App/>, document.getElementById('app'));
}

renderApp();

if ( module.hot ) {
	module.hot.accept(["App/App.js"], renderApp);
}
