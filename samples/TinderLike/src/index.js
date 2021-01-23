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

const allCards = ["bird", "car", "eyes", "bee", "moon", "bikini", "boobs", "muscles"].map(( name, i ) => ({
	id   : "App" + i,
	image: "https://source.unsplash.com/400x700/?" + name,
	label: name
}))

import "./index.scss";


const Sample = () => {
	
	let [cardIndex, setCardIndex] = React.useState(0),
	    next                      = ( card ) => {
		
		    setCardIndex((cardIndex + 1) % allCards.length);
		    // preload next
		    let i = (cardIndex + 2) % allCards.length;
		    if ( !allCards[i].loaded )
			    fetch(allCards[i].image)
				    .then(res => {// ugly img preload to avoid flick when switching cards
					    allCards[i].image  = res.url;
					    allCards[i].loaded = true;
				    })
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
	await fetch(allCards[1].image)
		.then(res => {// ugly img preload to avoid flick when switching cards
			allCards[1].image  = res.url;
			allCards[1].loaded = true;
		})
	await fetch(allCards[2].image)
		.then(res => {// ugly img preload to avoid flick when switching cards
			allCards[2].image  = res.url;
			allCards[1].loaded = true;
		})
	ReactDom.render(
		<Sample/>
		, document.getElementById('app'));
	
}

renderSample()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSample);
}