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
import * as cardStyles from "./SwipeCard/(*).js";

export default (
	{
		children,
		onDisliked,
		onLiked,
		nextCard,
		card
	}
) => {
	const [tweener, ViewBox]            = Voodoo.hook({ enableMouseDrag: true }),
	      [curCard, setCurCard]         = React.useState(card),
	      [curNextCard, setCurNextCard] = React.useState(nextCard),
	      renderCard                    = children,
	      rootNode                      = React.useRef(),
	      events                        = React.useRef({}),
	      styles                        = React.useMemo(
		      () => {
			      return {
				      inverse  : ( delta ) => -delta,
				      container: {
					      position       : "absolute",
					      top            : "50%",
					      left           : "50%",
					      width          : "100%",
					      height         : "100%",
					      perspective    : "800px",
					      backgroundColor: 'gray',
					      transform      : "translate(-50%,-50%)",
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
						      from    : 30,
						      duration: 40,
						      moving  : ( pos, precPos, update ) => {
							      tweener.scrollTo(Math.abs(.5 - pos) * 200, 0, "showNext");
						      }
					      },
					      {
						      from    : 15,
						      duration: .01,
						      entering: ( pos ) => {
							      if ( pos < 0 )// from 50 to 0 ( init go from 0 to 50 )
							      {
								      events.current.onDisliked?.(events.current?.curCard);
								      tweener.pushAnim(cardStyles.anims.pushIn("dislikeOverlay", 250));
							      }
						      }
					      },
					      {
						      from    : 85,
						      duration: .01,
						      entering: ( pos ) => {
							      if ( pos > 0 )// from 50 to 100
							      {
								      events.current.onLiked?.(events.current?.curCard);
								      tweener.pushAnim(cardStyles.anims.pushIn("likeOverlay", 250));
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
				tweener.scrollTo(0, 250, "show")
				       .then(
					       e => {
						       setCurCard(card)
					       }
				       )
		},
		[card, curCard, tweener]
	)
	React.useEffect(
		e => {
			tweener.scrollTo(50, 0, "hSwipe")
			tweener.scrollTo(50, 0, "vSwipe")
			tweener.scrollTo(100, 0, "showNext")
			tweener.scrollTo(100, 250, "show")
			       .then(
				       e => {
					       tweener.scrollTo(0, 0, "showNext");
					       setCurNextCard(nextCard)
				       }
			       )
			
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
		
		<Voodoo.Axis
			axe={"showNext"}
			size={100}
			defaultPosition={100}/>
		
		<div className={"layer"}>
			<Voodoo.Node
				axes={styles.nextCard.axes}
				style={styles.nextCard.style}>
				<div className={"nextCard"} draggable="false" key={"nextCard"}>
					{renderCard?.(curNextCard)}
				</div>
			</Voodoo.Node>
		</div>
		
		<div className={"layer"}>
			<Voodoo.Draggable
				yHook={styles.inverse}
				xHook={styles.inverse}
				yAxis={"vSwipe"}
				xAxis={"hSwipe"}>
				<Voodoo.Node
					axes={styles.card.axes}
					style={styles.card.style}>
					<div className={"card"} draggable="false">
						{renderCard?.(curCard)}
					</div>
				</Voodoo.Node>
			</Voodoo.Draggable>
		</div>
		
		<div className={"layer noEvent"}>
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
		
		</div>
		<div className={"likeBtn"} onClick={e => tweener.axes.hSwipe.scrollTo(100, 500, "easeCubicInOut")}>
			&#128077;
		</div>
		<div className={"dislikeBtn"} onClick={e => tweener.axes.hSwipe.scrollTo(0, 500, "easeCubicInOut")}>
			&#128072;
		</div>
	</ViewBox>;
}
