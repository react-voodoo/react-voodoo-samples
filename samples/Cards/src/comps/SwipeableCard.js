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

const swipeAxis     =
	      [
		      {
			      from    : 0,
			      duration: 50,
			      apply   : {
				      transform: [
					      {},
					      { translateZ: 50, rotateY: "-90deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: .0001,
			      apply   : {
				      transform: [
					      {},
					      { rotateY: "180deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: 50,
			      apply   : {
				      transform: [
					      {},
					      { translateZ: -50, rotateY: "-90deg" }
				      ],
			      }
		      },
	      ],
      cardStyle     = {
	      position : "relative",
	      transform: [
		      {
			      perspective: 500,
		      }
	      ]
      },
      cardHoverAnim = [
	      {
		      target  : "card",
		      from    : 0,
		      duration: 100,
		      apply   : {
			      transform: [{}, {
				      translateZ: 20
			      }]
		      }
	      }
      ];

@Voodoo.tweener({ enableMouseDrag: true })
export default class SwipeableCard extends React.Component {
	static defaultProps = {
		swipeAnim: swipeAxis,
		style    : cardStyle,
		showBack : false
	};
	state               = {};
	
	static getDerivedStateFromProps( props, state ) {
		let { swipeAnim, style } = props;
		return {
			swipeAnim: { swipeAxis: swipeAnim },
			style,
			showBack : state.showBack === undefined ? props.showBack : state.showBack
		}
	}
	
	
	mouseEnter = () => {
		let { tweener } = this.props;
		tweener.scrollTo(100, 500, "hovering")
	};
	
	mouseLeave = () => {
		let { tweener } = this.props;
		tweener.scrollTo(0, 500, "hovering")
	};
	
	_flipEvent = [
		{
			type    : "Event",
			from    : 50,
			duration: .01,
			entering: ( pos ) => {
				let {
					    showBack
				    } = this.state;
				console.log('SwipeableCard::entering:119: ', showBack, pos);
				if ( showBack !== (pos === 1) )
					this.setState({ showBack: pos === 1 })
			}
		},
	];
	
	inertia = {
		wayPoints: [{ at: 0 }, { at: 100 }],
	};
	
	render() {
		let {
			    swipeAnim, style,
			    showBack
		    } = this.state;
		return <>
			<Voodoo.Axis
				axe={"swipeAxis"}
				scrollableWindow={100}
				items={this._flipEvent}
				defaultPosition={showBack ? 100 : 0}
				inertia={this.inertia}
			/>
			<Voodoo.Axis
				axe={"hovering"}
				items={cardHoverAnim}
				defaultPosition={0}
			/>
			<Voodoo.Node id="card"
			             tweenAxis={swipeAnim}
			             initial={style}>
				<Voodoo.Draggable
					xAxis={"swipeAxis"}
					className={"SwipeableCard"}
					onMouseEnter={this.mouseEnter}
					onMouseLeave={this.mouseLeave}>
					{this.props.children?.[showBack ? 1 : 0]}
				</Voodoo.Draggable>
			</Voodoo.Node>
		</>;
	}
}
