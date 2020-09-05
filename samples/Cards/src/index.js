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

import React    from "react";
import ReactDom from "react-dom";

import Comps from "./comps/(*).js"

import "./index.scss";


class Sample extends React.Component {
	render() {
		return <div className={"SwipeableCards"}>
			<span>
				{
					Array(6).fill(null).map(
						( e, i ) =>
							<Comps.SwipeableCard key={i} showBack={!!(i % 2)}>
								<div className={"frontCard"}>
									<div className={"description"}>front {i}</div>
								</div>
								<div className={"backCard"}>
									<div className={"description"}>back {i}</div>
								</div>
							</Comps.SwipeableCard>
					)
				}
			</span>
		</div>;
	}
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