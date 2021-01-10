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


import React           from "react";
import Voodoo          from "react-voodoo";
import {pushIn}        from "../../../../../olds/SimpleHeaderTest/etc/anims";
import * as cardStyles from "./SwipeCard/(*).js";

export default (
	{
		children,
		onDisliked,
		onLiked,
		card
	}
) => {
	const [tweener, ViewBox]    = Voodoo.hook({ enableMouseDrag: true }),
	      [curCard, setCurCard] = React.useState(card),
	      rootNode              = React.useRef(),
	      events                = React.useRef({}),
	      styles                = React.useMemo(
		      () => {
			
			      return {
				      inverse   : ( delta ) => -delta,
				      container : {
					      position       : "absolute",
					      top            : "50%",
					      left           : "50%",
					      width          : "100%",
					      height         : "100%",
					      perspective    : "800px",
					      backgroundColor: 'green',
					      transform      : "translate(-50%,-50%)",
					      //overflow       : "hidden",
				      },
				      ...cardStyles,
				      hInertia  : {
					      wayPoints: [{ at: 0 }, { at: 50 }, { at: 100 }],
				      },
				      vInertia  : {
					      wayPoints: [{ at: 50 }],
				      },
				      hSwipeAxis: [
					      {
						      type    : "Event",
						      from    : 15,
						      duration: .00000001,
						      entering: ( pos ) => {
							      if ( pos === -1 )// from 50 to 0 ( init go from 0 to 50 )
							      {
								      events.current.onDisliked?.(events.current?.curCard);
								      tweener.pushAnim(cardStyles.anims.pushIn("dislikeOverlay"));
							      }
						      }
					      },
					      {
						      type    : "Event",
						      from    : 85,
						      duration: .00000001,
						      entering: ( pos ) => {
							      if ( pos === 1 )// from 50 to 100
							      {
								      events.current.onLiked?.(events.current?.curCard);
								      tweener.pushAnim(cardStyles.anims.pushIn("likeOverlay"));
							      }
						      }
					      },
				      ]
			      };
		      }
		      , []
	      );
	
	React.useEffect(
		e => {
			events.current = { onDisliked, onLiked, curCard };
		},
		[onDisliked, onLiked, curCard]
	)
	
	React.useEffect(
		e => {
			if ( card !== curCard )
				tweener.scrollTo(0, 500, "show")
				       .then(
					       e => {
						       tweener.scrollTo(50, 0, "hSwipe")
						       tweener.scrollTo(50, 0, "vSwipe")
						       setCurCard(card)
					       }
				       )
		},
		[card, curCard, tweener]
	)
	React.useEffect(
		e => {
			tweener.scrollTo(100, 500, "show")
		},
		[curCard, tweener]
	)
	return <ViewBox className={"SwipeCard"} style={styles.container} ref={rootNode}>
		<Voodoo.Axis
			axe={"hSwipe"}
			size={100}
			scrollableWindow={40}
			defaultPosition={50}
			items={styles.hSwipeAxis}
			inertia={styles.hInertia}/>
		<Voodoo.Axis
			axe={"vSwipe"}
			size={100}
			defaultPosition={50}
			inertia={styles.vInertia}/>
		<Voodoo.Axis
			axe={"show"}
			size={100}
			defaultPosition={100}/>
		<Voodoo.Draggable
			yHook={styles.inverse}
			xHook={styles.inverse}
			yAxis={"vSwipe"}
			xAxis={"hSwipe"}>
			<Voodoo.Node
				axes={styles.card.axes}
				style={styles.card.style}>
				<img className={"card"} src={curCard.image} draggable="false" key={curCard.image}/>
			</Voodoo.Node>
		</Voodoo.Draggable>
		
		<Voodoo.Node
			id={"likeOverlay"}
			axes={styles.likeOverlay.axes}
			style={styles.likeOverlay.style}>
			<div className={"likeOverlay"}>
				<h1>COOL :)</h1>
			</div>
		</Voodoo.Node>
		<Voodoo.Node
			id={"dislikeOverlay"}
			axes={styles.dislikeOverlay.axes}
			style={styles.dislikeOverlay.style}>
			<div className={"dislikeOverlay"}>
				<h1>Next !</h1>
			</div>
		</Voodoo.Node>
		{/*<Voodoo.Node*/}
		{/*	axes={styles.superLikeOverlay.axes}*/}
		{/*	style={styles.superLikeOverlay.style}>*/}
		{/*	<div className={"superLikeOverlay"}>*/}
		{/*		superLikeOverlay*/}
		{/*	</div>*/}
		{/*</Voodoo.Node>*/}
	</ViewBox>;
}