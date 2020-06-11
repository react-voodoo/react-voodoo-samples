/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
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


/**
 * This is an experimental lib & a very alpha demo
 * Probably not the simpler methods
 */

const initialBallStyle = {
	position: "absolute",
	display : "inline-block",
	cursor  : "pointer",
	overflow: "hidden",
	top     : "100%",
	left    : "100%",
	
};

@Voodoo.tweener({ enableMouseDrag: true })
export default class Cube extends React.Component {
	root = React.createRef();
	
	static defaultProps = {
		defaultPosition: {
			x: .5,
			y: .5
		},
		style          : initialBallStyle,
		color          : "black"
	};
	state               = {};
	nextTarget          = {};
	
	
	static getDerivedStateFromProps( props, state ) {
		let { color, style, defaultPosition } = props;
		return {
			facesStyle  : {
				front : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateY: 0, translateZ: "6vh" }
				},
				right : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateY: 90, translateZ: "6vh" }
				},
				back  : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateY: 180, translateZ: "6vh" }
				},
				left  : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateY: -90, translateZ: "6vh" }
				},
				top   : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateX: 90, translateZ: "6vh" }
				},
				bottom: {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : { rotateX: -90, translateZ: "6vh" }
				}
			},
			cubeStyle   : {
				position      : "absolute",
				width         : "10vh",
				height        : "10vh",
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
				width    : "8vh",
				height   : "8vh",
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
									translateZ: "1vh",
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
									translateZ: "4vh",
									translateY: "2vh",
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
								translateZ: "9vh",
								scale     : -.5,
							}],
						}
					},
					{
						from    : 10,
						duration: 190,
						target  : "content",
						apply   : {
							width    : "3vh",
							height   : "3vh",
							transform: [, , {
								translateY: "-15vh",
								
							}],
						}
					}
				]
			}
		}
	}
	
	inertiaX = {
		snapToBounds: false,
		shouldLoop  : (( v, d ) => {
			if ( d < 0 && ~~(d + v) <= 100 ) {
				return 100;
			}
			if ( d > 0 && ~~(d + v) >= 200 ) {
				return -100;
			}
		}),
	};
	inertiaY =
		{
			wayPoints: [{ at: 10 }, { at: 200 }]
		};
	
	render() {
		let { facesStyle, cubeStyle, contentStyle, axis } = this.state;
		return <Voodoo.Node
			style={cubeStyle}
			id={"root"}>
			
			<Voodoo.Draggable yAxis={"scrollY"} xAxis={"scrollX"}>
				<Voodoo.Axis axe={"scrollY"} defaultPosition={10}
				             items={axis.scrollY}
				             inertia={this.inertiaY}/>
				<Voodoo.Axis axe={"scrollX"} defaultPosition={100 + 20}
				             items={axis.scrollX}
				             scrollableWindow={33}
				             inertia={this.inertiaX}/>
				<Voodoo.Node.div id={"front"} initial={facesStyle.front} className={"face"}/>
				<Voodoo.Node.div id={"back"} initial={facesStyle.back} className={"face"}/>
				<Voodoo.Node.div id={"right"} initial={facesStyle.right} className={"face"}/>
				<Voodoo.Node.div id={"left"} initial={facesStyle.left} className={"face"}/>
				<Voodoo.Node.div id={"top"} initial={facesStyle.top} className={"face"}/>
				<Voodoo.Node.div id={"bottom"} initial={facesStyle.bottom} className={"face"}/>
				<Voodoo.Node.div id={"content"} initial={contentStyle} className={"content"}/>
			
			</Voodoo.Draggable>
		</Voodoo.Node>
			;
	}
}