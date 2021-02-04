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

import React                     from "react";
import ReactDom                  from "react-dom";
import Voodoo                    from "react-voodoo";
import {SwipeCard, GithubCorner} from "./comps/(*).js";

const allCards = [];

allCards.unshift(
	{
		image: require('./assets/img.jpg').default,
		label: "John"
	},
	{
		image: require('./assets/img0.jpg').default,
		label: "Louis"
	},
	{
		image: require('./assets/img1.jpg').default,
		label: "John"
	},
	{
		image: require('./assets/img2.jpg').default,
		label: "Louis"
	},
	{
		image: require('./assets/img3.jpg').default,
		label: "Louis"
	}
)

import "./index.scss";


const Sample = () => {
	
	let [cardIndex, setCardIndex] = React.useState(0),
	    next                      = ( card ) => {
		
		    setCardIndex((cardIndex + 1) % allCards.length);
		
		    // preload next
		    let i = (cardIndex + 2) % allCards.length;
		    if ( !allCards[i].loaded )
			    setTimeout(// ugly img preload to avoid flick / reload when switching cards
			               e => fetch(allCards[i].image)
				               .then(res => {
					               allCards[i].image  = res.url;
					               allCards[i].loaded = true;
				               }), 500)
	    };
	return <>
		<GithubCorner/>
		<div className={"desk"}>
			<SwipeCard
				card={allCards[cardIndex]}
				nextCard={allCards[(cardIndex + 1) % allCards.length]}
				onDisliked={next}
				onLiked={next}
			>
				{
					card => <img src={card.image} draggable="false" key={card.id}/>
				}
			</SwipeCard>
		</div>
	</>
}


document.body.innerHTML = '<div id="app"></div>';

async function renderSample() {
	
	ReactDom.render(
		<Sample/>
		, document.getElementById('app'));
	
}

renderSample()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSample);
}