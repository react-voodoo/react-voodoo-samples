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

export default ( props ) => {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
	      {
		      defaultPosition = {
			      x: .5,
			      y: .5
		      },
		      style           = initialBallStyle,
		      color           = "black"
	      }                  = props,
	      styles             = React.useMemo(
		      () => (
			      {
				      facesStyle  : {
					      front : {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateY: 0, translateZ: "5em" }
					      },
					      right : {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateY: 90, translateZ: "5em" }
					      },
					      back  : {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateY: 180, translateZ: "5em" }
					      },
					      left  : {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateY: -90, translateZ: "5em" }
					      },
					      top   : {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateX: 90, translateZ: "5em" }
					      },
					      bottom: {
						      position       : "absolute",
						      width          : "100%",
						      height         : "100%",
						      backgroundColor: color,
						      opacity        : .5,
						      transform      : { rotateX: -90, translateZ: "5em" }
					      }
				      },
				      cubeStyle   : {
					      position      : "absolute",
					      width         : "9em",
					      height        : "9em",
					      left          : (defaultPosition.x * 100) + "%",
					      top           : (defaultPosition.y * 100) + "%",
					      transformStyle: "preserve-3d",
					      transform     : [
						      {
							      translateX: "-50%",
							      translateY: "-50%",
							      rotateX   : "-20deg",
						      },
					      ]
				      },
				      contentStyle: {
					      position : "absolute",
					      width    : "8em",
					      height   : "8em",
					      left     : "50%",
					      top      : "50%",
					      transform: [
						      {
							      translateX: "-50%",
							      translateY: "-50%",
						      }, {
							      //rotateX: "20deg",
						      },
					      ]
				      },
				      axis        : {
					      scrollX: [
						      {
							      from    : 0,
							      duration: 300,
							      target  : "root",
							      apply   : {
								      transform: [, {
									      rotateY: "-1080deg"
								      }],
							      }
						      },
						      {
							      from    : 0,
							      duration: 300,
							      target  : "content",
							      apply   : {
								      transform: [, {
									      rotateY: "1080deg"
								      }],
							      }
						      }
					      ],
					      scrollY: [
						      ...['front', 'back', 'left', 'right', 'top'].map(
							      target => ({
								      from    : 0,
								      duration: 100,
								      target,
								      apply   : {
									      transform: [{}, {
										      translateZ: "1em",
									      }],
								      }
							      })
						      ),
						      ...['front', 'back', 'left', 'right'].map(
							      target => ({
								      from    : 10,
								      duration: 100,
								      target,
								      apply   : {
									      transform: [{}, {
										      translateZ: "4em",
										      translateY: "2em",
										      rotateX   : "-45deg",
									      }],
								      }
							      })
						      ),
						      {
							      from    : 10,
							      duration: 90,
							      target  : "top",
							      apply   : {
								      opacity  : -.5,
								      transform: [, {
									      translateZ: "5em",
									      scale     : -.5,
								      }],
							      }
						      },
						      {
							      from    : 10,
							      duration: 90,
							      target  : "content",
							      apply   : {
								      width    : "3em",
								      height   : "3em",
								      transform: [, , {
									      translateY: "-15em",
									      
								      }],
							      }
						      }
					      ]
				      },
				      inertiaX    : {
					      snapToBounds: false,
					      shouldLoop  : (( v, d ) => {
						      if ( d < 0 && ~~(d + v) <= 100 ) {
							      return 100;
						      }
						      if ( d > 0 && ~~(d + v) >= 200 ) {
							      return -100;
						      }
					      }),
				      },
				      inertiaY    :
					      {
						      wayPoints: [{ at: 10 }, { at: 100 }]
					      }
			      }
		      ), [color, style, defaultPosition]
	      );
	
	
	return <ViewBox className={"Cube"}>
		<Voodoo.Axis axe={"scrollY"} defaultPosition={10}
		             items={styles.axis.scrollY}
		             scrollableWindow={200}
		             inertia={styles.inertiaY}/>
		<Voodoo.Axis axe={"scrollX"} defaultPosition={100 + 30}
		             items={styles.axis.scrollX}
		             scrollableWindow={60}
		             inertia={styles.inertiaX}/>
		<Voodoo.Node
			style={styles.cubeStyle}
			id={"root"}>
			
			<Voodoo.Draggable yAxis={"scrollY"} xAxis={"scrollX"}>
				<Voodoo.Node.div id={"front"} initial={styles.facesStyle.front} className={"face"}/>
				<Voodoo.Node.div id={"back"} initial={styles.facesStyle.back} className={"face"}/>
				<Voodoo.Node.div id={"right"} initial={styles.facesStyle.right} className={"face"}/>
				<Voodoo.Node.div id={"left"} initial={styles.facesStyle.left} className={"face"}/>
				<Voodoo.Node.div id={"top"} initial={styles.facesStyle.top} className={"face"}/>
				<Voodoo.Node.div id={"bottom"} initial={styles.facesStyle.bottom} className={"face"}/>
				<Voodoo.Node.div id={"content"} initial={styles.contentStyle} className={"content"}/>
			</Voodoo.Draggable>
		</Voodoo.Node>
	</ViewBox>;
}
