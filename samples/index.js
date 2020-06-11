/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React    from "react";
import ReactDom from "react-dom";

import Samples from "./(*)/index.js"
import "./samples.scss";

class App extends React.Component {
	state = {
		current: "Cubes"
	};
	
	render() {
		let Comp = Samples[this.state.current];
		return <div className={"app"}>
			<div className={"sampleLst"}>
				{
					Object.keys(Samples).map(
						key => <div onClick={e => this.setState({ current: key })} key={key}>{key}</div>
					)
				}
				<img
					src={"https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=demo"}/>
			</div>
			<div className={"sample"}>
				
				
				<Comp/>
			</div>
		
		</div>
	}
}

function renderSamples() {
	ReactDom.render(
		<App/>
		, document.getElementById('app'));
	
}

renderSamples()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSamples);
}