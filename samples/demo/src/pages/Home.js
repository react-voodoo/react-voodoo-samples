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

import React          from "react";
import ReactDom       from "react-dom";
import Voodoo         from "react-voodoo";
import {RadialSelect} from "../comps/(*).js";
import homeStyles     from "./Home/(**/*).js";

const allSamples = [
	{
		label      : "TinderLike swiper",
		path       : "./samples/TinderLike/dist/static/index.html",
		description: "Swipe card desk like the native tinder anim",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/TinderLike",
		sandbox    : "https://codesandbox.io/s/tinder-like-card-swiper-1735w"
	},
	{
		label      : "Swipeable Menu",
		path       : "./samples/AndroidMenu/dist/static/index.html",
		description: "Proof of concept Android style Menu",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/AndroidMenu",
		sandbox    : "https://codesandbox.io/s/android-style-menu-bhn1n"
	},
	{
		label      : "Swipeable cards",
		path       : "./samples/Cards/dist/static/index.html",
		description: "Swipeable cards",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cards",
		sandbox    : "https://codesandbox.io/s/react-voodoo-demo-cards-fmpt2?file=/src/comps/SwipeableCard.js"
	},
	{
		label      : "3d Cubes",
		path       : "./samples/Cubes/dist/static/index.html",
		description: "3d Cubes",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cubes",
		sandbox    : "https://codesandbox.io/s/react-voodoo-cube-demo-7d65t"
	},
	{
		label      : "Goo balls",
		path       : "./samples/Goo/dist/static/index.html",
		github     : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Goo",
		description: "Multitouch Goo balls"
	}
]
const allSlides  = [
	{
		label      : " React-Voodoo",
		title      : "Welcome ! ",
		description: <div>
			React-voodoo is an additive & intuitive tween engine for React<br/>
			<br/>
			It's a drafty demo site; But you'll find here some simple / cool samples.<br/>
			All demos have theirs github & codesandbox<br/>
			<br/>
		</div>,
		link       : "https://github.com/react-voodoo/react-voodoo"
	},
	{
		label : "Samples",
		goDown: true
	},
	{
		label      : "Doc",
		title      : "Basic documentation",
		description: "Here some draft documentation",
		link       : "https://github.com/react-voodoo/react-voodoo/tree/master/doc",
	}
]


const initialSampleIndex = allSamples.findIndex(s => (("sample/" + s.label) === decodeURI(location.hash.substring(1)))),
      onBot              = location.hash.substring(1).startsWith("sample/");

export default () => {
	let [tweener, ViewBox]          = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true }),
	    [atTop, setAtTop]           = React.useState(!onBot),
	    [curItems, setCurItems]     = React.useState(atTop ? allSlides : allSamples),
	    [cItemIndex, setCItemIndex] = React.useState(onBot && initialSampleIndex || 0),
	    cItem                       = React.useMemo(
		    () => curItems[cItemIndex],
		    [cItemIndex, curItems]
	    ),
	    [viewMode, setViewMode]     = React.useState("mobile"),
	    styles                      = React.useMemo(
		    () => ({
			    pageSwipe: {
				    axis: [
					    {
						    from    : 45,
						    duration: 1,
						    entering( move ) {
							    setAtTop(move < 0);
							    let cMenu = move < 0 ? allSlides : allSamples;
							    setCurItems(cMenu);
							    setCItemIndex(0)
							    if ( move < 0 )
								    location.hash = "#";
						    }
					    }
				    ]
			    },
			    ...(homeStyles[viewMode]),
			
			    pageInertia: {
				    wayPoints: [{ at: 0 }, { at: 50 }]
			    }
		    }), [viewMode]),
	    setSampleIndex              = ( index ) => {
		    if ( atTop ) {
			    location.hash = "#";
			    setCItemIndex(index)
		    }
		    else {
			    location.hash = "#sample/" + curItems[index].label;
			    setCItemIndex(index)
		    }
	    };
	React.useEffect(
		() => {
			//let onResize = e => setViewMode(window.innerWidth > 700 ? "desktop" : "mobile")
			let onScroll = e => tweener.axes.pageSwipe.scrollTo(e.deltaY > 0 ? 50 : 0, 250, "ease-in-out-cubic")
			//window.addEventListener("resize", onResize)
			window.addEventListener("wheel", onScroll, { passive: true });
			
			return e => {
				//window.removeEventListener("resize", onResize);
				window.removeEventListener("wheel", onScroll);
			}
		},
		[]
	);
	return <ViewBox className={"Home"}>
		
		<Voodoo.Axis
			axe={"pageSwipe"}
			size={100}
			scrollableWindow={100}
			defaultPosition={atTop ? 0 : 50}
			items={styles.pageSwipe.axis}
			inertia={styles.pageInertia}
		/>
		{/*<GithubCorner/>*/}
		<Voodoo.Draggable className={"page"}
			//xHook={styles.inverse}
			              yAxis={"pageSwipe"}>
			<Voodoo.Node
				id={"header"}
				axes={styles.header.axes}
				style={styles.header.style}>
				<div className={"header"}>
					<div className={"description"} onClick={e => tweener.axes.pageSwipe.scrollTo(0, 250)}>
						<h1>react-voodoo </h1>
					</div>
				</div>
			</Voodoo.Node>
			<Voodoo.Node
				id={"homeBlock"}
				axes={styles.homeBlock.axes}
				style={styles.homeBlock.style}>
				<div className={"homeBlock"}>
					<div className={"description"}>
						<h2>
							{cItem?.title}
						</h2>
						<div>
							{cItem?.description}
						</div>
						{
							cItem?.link &&
							<a href={cItem.link} target={"_blank"}>
								{cItem.link}
							</a>
						}
						<br/>
					</div>
					<div className={"down"} onClick={e => tweener.axes.pageSwipe.scrollTo(50, 250)}>▼</div>
				</div>
			</Voodoo.Node>
			<Voodoo.Node
				id={"RadialSelect"}
				axes={styles.RadialSelect.axes}
				style={styles.RadialSelect.style}>
				<div>
					<RadialSelect
						//key={atTop + ""}
						onChange={( item, i ) => {
							setSampleIndex(i);
							item.goDown && tweener.axes.pageSwipe.scrollTo(50, 250)
						}}
						selectedIndex={cItemIndex}
						items={curItems}/>
				</div>
			</Voodoo.Node>
			<Voodoo.Node
				id={"desk"}
				axes={styles.desk.axes}
				style={styles.desk.style}>
				<div className={"desk"}>
					<div className={"menu"}>
						{
							allSamples.map(
								( sample, i ) =>
									<div
										key={i}
										className={"button " + (sample === cItem ? "fire" : "ice")}
										onClick={e => setSampleIndex(i)}>
										{sample.label}
									</div>
							)
						}
					</div>
					{
						!atTop && cItem &&
						<div className={"demo"}>
							<iframe src={cItem.path}/>
							<div className={"details"}>
								{
									cItem.path &&
									<a href={cItem.path} className={"codesandbox"}>
										<img src={require("App/assets/fullPage.png").default} draggable="false"/>
									</a>
								}
								{
									cItem?.github &&
									<a href={cItem.github} target={"_new"} className={"codesandbox"}>
										<img src={require("App/assets/github.png").default} draggable="false"/>
									</a>
								}
								{
									cItem?.sandbox &&
									<a href={cItem.sandbox} target={"_new"} className={"codesandbox"}>
										<img src={require("App/assets/codesandbox.png").default} draggable="false"/>
									</a>
								}
								<div className={"description"}>
									<span>
										{cItem?.description || ''}
									</span>
								</div>
							</div>
						</div>
					}
				
				</div>
			</Voodoo.Node>
		</Voodoo.Draggable>
	</ViewBox>
}

module.hot?.accept?.()
