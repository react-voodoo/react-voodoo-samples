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

const initialBallStyle = {
	position: "absolute",
	display : "inline-block",
	cursor  : "pointer",
	overflow: "hidden",
	top     : "100%",
	left    : "100%",
};

export default ( { defaultPosition = { x: .5, y: .5 }, style = initialBallStyle, color = "black" } ) => {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
	      currentTarget      = React.useRef(null),
	      nextTarget         = React.useRef({
		                                        scrollX: 1 - defaultPosition.x,
		                                        scrollY: 1 - defaultPosition.y,
	                                        }),
	      lastTm             = React.useRef(0),
	      pendingGotoTm      = React.useRef(null),
	      
	      styles             = React.useMemo(
		      () => ({
			      nodeStyle: {
				      ...initialBallStyle,
				      ...style,
				      backgroundColor: color,
				      transform      : [
					      { translateX: "0box", translateY: "0box" },
					      { translateX: "-50%", translateY: "-50%" },
				      ]
			      },
			      styleBall: {
				      ...initialBallStyle,
				      ...style,
				      backgroundColor: color,
				      top            : "0%",
				      left           : "0%",
				      transform      : [
					      {
						      translateX: defaultPosition.x + "box",
						      translateY: defaultPosition.y + "box",
					      },
					      { translateX: "-50%", translateY: "-50%" },
				      ]
			      },
			      ballAxis : {
				      scrollX: [
					      {
						      from    : 0,
						      duration: 200,
						      apply   : { transform: { translateX: "-1box" } },
						      moving  : ( pos ) => {
							      scrollRef.current?.(pos, "scrollX")
						      },
					      }
				      ],
				      scrollY: [
					      {
						      from    : 0,
						      duration: 200,
						      apply   : { transform: { translateY: "-1box" } },
						      moving  : ( pos ) => scrollRef.current?.(pos, "scrollY"),
					      }
				      ]
			      },
			      inertiaX : {
				      willEnd( targetPos, targetDelta, duration ) {
					      console.log('inertiaX::willEnd: ', targetPos, targetDelta, duration);
				      }
			      },
			      inertiaY : {
				      willEnd( targetPos, targetDelta, duration ) {
					      console.log('inertiaY::willEnd: ', targetPos, targetDelta, duration);
				      }
			      },
		      }),
		      [color, style, defaultPosition]
	      ),
	      scrollRef          = React.useRef(( pos, axis ) => {
		      const now                = Date.now();
		      nextTarget.current[axis] = pos;
		      if ( pendingGotoTm.current ) clearTimeout(pendingGotoTm.current);
		      if ( now - lastTm.current < 50 || Object.keys(nextTarget.current).length !== 2 ) {
			      pendingGotoTm.current = setTimeout(() => scrollRef.current?.(pos, axis), 50);
			      return;
		      }
		      lastTm.current = now;
		      
		      const target     = {
			      y: (1 - nextTarget.current.scrollY),
			      x: (1 - nextTarget.current.scrollX),
		      };
		      target.y         = Math.min(1, Math.max(0, parseFloat(target.y.toFixed(3))));
		      target.x         = Math.min(1, Math.max(0, parseFloat(target.x.toFixed(3))));
		      const lastTarget = currentTarget.current;
		      if ( !lastTarget ) {
			      currentTarget.current = target;
			      return;
		      }
		      currentTarget.current = target;
		      
		      const tween = {
			      transform: {
				      translateX: (target.x - lastTarget.x) + "box",
				      translateY: (target.y - lastTarget.y) + "box",
			      }
		      };
		      //console.log('target:::121: ', tween.transform);
		      tweener.pushAnim([
			                       { target: "goo3", duration: 200, apply: tween },
			                       { target: "goo2", duration: 300, apply: tween },
		                       ]);
	      });
	
	// Updated each render so the moving callbacks always call the latest closure
	//scrollRef.current = ;
	
	return <ViewBox className={"GooBall"}>
		<Voodoo.Axis axe={"scrollY"}
		             defaultPosition={200 - defaultPosition.y * 200}
		             inertia={styles.inertiaY}/>
		<Voodoo.Axis axe={"scrollX"}
		             defaultPosition={200 - defaultPosition.x * 200}
		             inertia={styles.inertiaX}/>
		<Voodoo.Draggable yAxis={"scrollY"} xAxis={"scrollX"}>
			<Voodoo.Node.div id={"goo2"}
			                 initial={styles.styleBall}
			                 className={"ball"}/>
			<Voodoo.Node.div id={"goo3"}
			                 initial={styles.styleBall}
			                 className={"ball"}/>
			<Voodoo.Node.div id={"goo1"}
			                 tweenAxis={styles.ballAxis}
			                 initial={styles.nodeStyle}
			                 className={"ball"}/>
		</Voodoo.Draggable>
	</ViewBox>;
};
