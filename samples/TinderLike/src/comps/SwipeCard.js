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
import ReactDom        from "react-dom";
import Voodoo          from "react-voodoo";
import * as cardStyles from "./SwipeCard/(*).js";

export default (
	{
		children,
		card
	}
) => {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
	      rootNode           = React.useRef(),
	      styles             = React.useMemo(
		      () => {
			
			      return {
				      inverse  : ( delta ) => -delta,
				      container: {
					      position       : "absolute",
					      top            : "50%",
					      left           : "50%",
					      width          : "100%",
					      height         : "100%",
					      perspective    : "400px",
					      backgroundColor: 'green',
					      transform      : "translate(-50%,-50%)",
					      overflow       : "hidden",
				      },
				      ...cardStyles,
				      hInertia : {
					      wayPoints: [{ at: 0 }, { at: 50 }, { at: 100 }],
				      },
				      vInertia : {
					      wayPoints: [{ at: 50 }],
				      }
			      };
		      }
		      , []
	      )
	;
	console.log(':::138: ', styles.card.style);
	return <ViewBox className={"SwipeCard"} style={styles.container} ref={rootNode}>
		<Voodoo.Axis
			axe={"hSwipe"}
			size={100}
			scrollableWindow={40}
			defaultPosition={50}
			inertia={styles.hInertia}
		/>
		<Voodoo.Axis
			axe={"vSwipe"}
			size={100}
			defaultPosition={50}
			inertia={styles.vInertia}
		/>
		<Voodoo.Axis
			axe={"show"}
			size={100}
			defaultPosition={100}
		/>
		<Voodoo.Draggable
			yHook={styles.inverse}
			xHook={styles.inverse}
			yAxis={"vSwipe"}
			xAxis={"hSwipe"}
			//yBoxRef={rootNode}
		>
			<Voodoo.Node
				axes={styles.card.axes}
				style={styles.card.style}
			>
				<img className={"card"} src={card.image} draggable="false" />
			</Voodoo.Node>
		</Voodoo.Draggable>
		
		<Voodoo.Node
			axes={styles.likeOverlay.axes}
			style={styles.likeOverlay.style}>
			<div className={"likeOverlay"}>
				<h1>COOL :)</h1>
			</div>
		</Voodoo.Node>
		<Voodoo.Node
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