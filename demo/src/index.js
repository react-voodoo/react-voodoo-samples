/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React          from "react";
import ReactDom       from "react-dom";
import {RadialSelect} from "./comps/(*).js";

const allSamples = [
	{
		label      : "TinderLike swiper",
		path       : "./samples/TinderLike/dist/static/index.html",
		description: "Swipe card desk like the native tinder anim",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/TinderLike",
		sandbox    : "https://codesandbox.io/s/tinder-like-card-swiper-1735w"
	},
	{
		label      : "Swipeable Menu",
		path       : "./samples/AndroidMenu/dist/static/index.html",
		description: "Proof of concept Android style Menu",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/AndroidMenu",
		sandbox    : "https://codesandbox.io/s/android-style-menu-bhn1n"
	},
	{
		label      : "Swipeable cards",
		path       : "./samples/Cards/dist/static/index.html",
		description: "Swipeable cards",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cards",
		sandbox    : "https://codesandbox.io/s/react-voodoo-demo-cards-fmpt2?file=/src/comps/SwipeableCard.js"
	},
	{
		label      : "3d Cubes",
		path       : "./samples/Cubes/dist/static/index.html",
		description: "3d Cubes",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cubes",
		sandbox    : "https://codesandbox.io/s/react-voodoo-cube-demo-7d65t"
	},
	{
		label      : "Goo balls",
		path       : "./samples/Goo/dist/static/index.html",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Goo",
		description: "Multitouch Goo balls"
	}
]

import "./index.scss";


const Sample = () => {
	
	let [sampleIndex, setSampleIndex] = React.useState(0);
	return <>
		{/*<GithubCorner/>*/}
		<div className={"header"}>
			<div className={"description"}>
				<h1><a href={"https://github.com/react-voodoo/react-voodoo"} target={"_new"}>react-voodoo</a> Samples
				</h1>
			</div>
		</div>
		<RadialSelect
			onChange={( item, i ) => setSampleIndex(i)}
			selectedIndex={sampleIndex}
			items={allSamples}/>
		<div className={"desk"}>
			<div className={"menu"}>
				{
					allSamples.map(
						( sample, i ) =>
							<div className={"button " + (i === sampleIndex ? "fire" : "ice")}
							     onClick={e => setSampleIndex(i)}>
								{sample.label}
							</div>
					)
				}
			</div>
			<div className={"demo"}>
				<iframe src={allSamples[sampleIndex].path}/>
				<div className={"details"}>
					<div className={"description"}>
						{allSamples[sampleIndex].description}
					</div>
					{
						allSamples[sampleIndex].github &&
						<a href={allSamples[sampleIndex].github} target={"_new"} className={"codesandbox"}>
							<img src={require("App/assets/github.png").default} draggable="false"/>
						</a>
					}
					{
						allSamples[sampleIndex].sandbox &&
						<a href={allSamples[sampleIndex].sandbox} target={"_new"} className={"codesandbox"}>
							<img src={require("App/assets/codesandbox.png").default} draggable="false"/>
						</a>
					}
				</div>
			</div>
		
		</div>
	</>
}


document.body.innerHTML = '<div id="app"></div>';

function renderSample() {
	ReactDom.render(
		<Sample/>
		, document.getElementById('app'));
	
}

renderSample()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSample);
}

