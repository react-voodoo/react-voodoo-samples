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


import React  from "react";
import Voodoo from "react-voodoo";

export default (
	{
		children,
		onChange,
		items,
		selectedIndex,
		card
	}
) => {
	const [tweener, ViewBox]    = Voodoo.hook({ enableMouseDrag: true }),
	      [curItem, setCurItem] = React.useState(0),
	      rootNode              = React.useRef(),
	      events                = React.useRef({ onChange }),
	      allItems              = React.useMemo(
		      () => ([...items, ...items, ...items].reverse()),
		      [items]
	      ),
	      slotSize              = React.useMemo(
		      () => (15),
		      []
	      ),
	      slideLength           = React.useMemo(
		      () => (allItems.length * slotSize),
		      [allItems]
	      ),
	      styles                = React.useMemo(
		      () => {
			      return {
				      inverse   : ( delta ) => -delta,
				      container : {
					      //position       : "absolute",
					      //top            : "50%",
					      //left           : "50%",
					      //width          : "100%",
					      //height         : "100%",
					      //perspective    : "800px",
					      //backgroundColor: 'gray',
					      //transform      : "translate(-50%,-50%)",
					      //userSelect     : "none"
				      },
				      textStyle : {
					      textAlign : "center",
					      userSelect: "none"
				      },
				      backWheel : {
					      style: {
						      position : "absolute",
						      top      : "-28%",
						      left     : "50%",
						      width    : "100%",
						      transform: [
							      {
								      translateY: "-50%",
								      translateX: "-50%"
							      },
							      {
								      rotateZ: "73deg"
							      }
						      ]
					      },
					      axes : {
						      hSwipe: [
							      // rotate
							      {
								      from    : 0,
								      duration: slideLength,
								      apply   : {
									      transform: [
										      {},
										      {
											      rotateZ: (1 + (-3 * 360)) + "deg"
										      },
										      {}
									      ]
								      }
							      }
						      ]
					      }
				      },
				      frontWheel: {
					      style: {
						      position : "absolute",
						      top      : "-28%",
						      left     : "50%",
						      width    : "100%",
						      transform: [
							      {
								      translateY: "-50%",
								      translateX: "-50%"
							      },
							      {}
						      ]
					      },
					      axes : {
						      hSwipe: [
							      // rotate
							      {
								      from    : 0,
								      duration: slideLength,
								      apply   : {
									      transform: [
										      {},
										      {},
										      {}
									      ]
								      }
							      }
						      ]
					      }
				      },
				      items     : allItems.map(
					      ( item, i ) => (
						      {
							      style: {
								      position : "absolute",
								      top      : "0%",
								      left     : "50%",
								      width    : "100%",
								      height   : "140%",
								      textAlign: "center",
								      opacity  : 0,
								      fontSize : "35px",
								      cursor   : "pointer",
								      transform: [
									      {
										      translateX: "-50%"
									      },
									      {
										      translateY: "-70%"
									      },
									      {
										      rotateZ: "150deg"
									      },
									      {
										      translateY: "70%"
									      }
								      ]
							      },
							      axes : {
								      vSwipe: [
									      {
										      from    : 0,
										      duration: 100,
										      apply   : {
											      transform: [
												      {},
												      {},
												      {},
												      {
													      rotateX: "30deg"
												      }
											      ]
										      }
									      }
								      ],
								      hSwipe: [
									      // rotate
									      {
										      from    : i * slotSize,
										      duration: slotSize * 4,
										      apply   : {
											      transform: [
												      {},
												      {},
												      {
													      rotateZ: "-300deg"
												      },
												      {}
											      ]
										      }
									      },
									      // disapear
									      {
										      from    : i * slotSize,
										      duration: slotSize * .5,
										      apply   : {
											      opacity: 1
										      }
									      },
									      {
										      from    : i * slotSize + slotSize * 3.5,
										      duration: slotSize * .5,
										      apply   : {
											      opacity: -1
										      }
									      },
									      // focus
									      {
										      from    : i * slotSize + slotSize * 1.5,
										      duration: slotSize * .25,
										      apply   : {
											      fontSize: "7px"
										      }
									      },
									      {
										      from    : i * slotSize + slotSize * 2.25,
										      duration: slotSize * .25,
										      apply   : {
											      fontSize: "-7px"
										      }
									      }
								      ]
							      }
						      }
					      )
				      ),
				      hInertia  : {
					      willSnap  : ( index ) => {
						      let target = (allItems.length - index + 1) % items.length;
						      setTimeout(
							      tm => events.current.onChange?.(items[target], target),
							      500
						      )
						      events.current.target = target;
					      },
					      shouldLoop: ( currentPos ) => (
						      currentPos >= slideLength * 2 / 3
						      ?
						      -slideLength / 3
						      :
						      currentPos < slideLength / 3
						      ?
						      slideLength / 3
						      : null
					      ),
					      wayPoints : allItems.map(( item, i ) => ({ at: slotSize * i }))
				      },
				      vInertia  : {
					      wayPoints: [{ at: 0 }, { at: 100 }]
				      }
			      };
		      }
		      , [allItems, slideLength]
	      );
	
	React.useEffect(
		e => {
			events.current = { onChange, curItem, target: events.current.target, current: events.current.current };
		},
		[onChange, curItem]
	)
	React.useEffect(
		e => {
			let i = 2 * items.length - selectedIndex + 1;
			if ( events.current.current === undefined ) {
				events.current.current = selectedIndex;
				return;
			}
			if ( selectedIndex !== events.current.target && selectedIndex !== events.current.current ) {
				tweener.axes.hSwipe.scrollTo(i * slotSize, 250, "easeCubicInOut")
				       //.then(
					   //    t =>
						//       tweener.axes.hSwipe.scrollTo(i * slotSize, 250, "easeCubicInOut")
				       //);
				events.current.current = selectedIndex;
				events.current.target  = undefined;
			}
		},
		[selectedIndex]
	)
	return <ViewBox className={"RadialSelect"} style={styles.container} ref={rootNode}>
		<Voodoo.Axis
			axe={"hSwipe"}
			size={slideLength}
			scrollableWindow={15}
			defaultPosition={(items.length + 1) * 15}
			items={styles.hSwipeAxis}
			inertia={styles.hInertia}/>
		<Voodoo.Axis
			axe={"vSwipe"}
			size={100}
			//scrollableWindow={15}
			defaultPosition={100}
			inertia={styles.vInertia}/>
		
		<Voodoo.Node
			axes={styles.backWheel.axes}
			style={styles.backWheel.style}>
			<img className={"logo-back"} src={require("App/assets/logo-menu-b.png").default} draggable="false"/>
		</Voodoo.Node>
		
		<Voodoo.Node
			axes={styles.frontWheel.axes}
			style={styles.frontWheel.style}>
			<img className={"logo"} src={require("App/assets/logo-menu.png").default} draggable="false"/>
		</Voodoo.Node>
		
		<Voodoo.Draggable className={"items"}
		                  xHook={styles.inverse}
		                  xAxis={"hSwipe"}>
			{/*<div draggable="false">*/}
			{
				allItems.map(
					( item, i ) =>
						<Voodoo.Node
							key={i}
							axes={styles.items[i].axes}
							style={styles.items[i].style}>
							<div onClick={e => {
								tweener.axes.hSwipe.scrollTo((i + 2) * slotSize, 250, "easeCubicInOut")
								       .then(
									       e => events.current.onChange?.(item, items.indexOf(item))
								       )
							}} draggable="false">
								<svg viewBox="0 0 500 250" draggable="false"
								     height={"100%"}
								     width={"100%"}>
									<path id="curve" fill="transparent"
										//d="M 73.199999,52.988199 C 77.499999,57.077753 137,111.46272 248.3,112.19518
										// 361.4,112.92764 422.9,57.566058 426.9,53.842733"/>
										  d="M 73.199999,52.988199 C 77.499999,58.435185 137,130.87197 248.3,131.84755 361.4,132.82313 422.9,59.085571 426.9,54.126375"/>
									<text>
										<textPath href="#curve"
										          className={"radialBtn"}
										          style={styles.textStyle}
										          textAnchor="middle"
										          fontFamily={"'Aladin', cursive"}
										          startOffset="50%">
											{item.label}
										</textPath>
									</text>
								</svg>
							
							</div>
						</Voodoo.Node>
				)
			}
			{/*</div>*/}
		</Voodoo.Draggable>
	
	</ViewBox>;
}