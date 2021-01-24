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


import React    from "react";
import ReactDom from "react-dom";
import Voodoo   from "react-voodoo";


const Launcher = ( { label, icon, nodeRef, ...props } ) => {
	return <div className={"launcher"} {...props} ref={nodeRef}>
		<img src={icon}/>
		{label}
	</div>
}

export default (
	{
		children,
		rows = 4,
		cols = 4,
		LauncherComp = Launcher,
		width = 375,
		padding = 7,
		minimizedHeight = 35,
		maximizedHeight = 400,
		launchers,
		launcherHeight = 64,
		launcherWidth = 64,
		launcherStyle = {
			opacity  : 0,
			transform: [
				{},
				{},
				{
					rotateX   : "90deg",
					rotateZ   : "90deg",
					translateZ: "20px"
				}
			]
		},
		launcherEntering = [
			{
				from    : 0,
				duration: 100,
				apply   : {
					opacity  : 1,
					transform: [
						{},
						{},
						{
							rotateX   : "-90deg",
							rotateZ   : "-90deg",
							translateZ: "-20px"
						}
					]
				}
			},
		],
		closedStatus="Swipe me down !",
		openStatus="Swipe me up !"
	}
) => {
	const [tweener, ViewBox]  = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true }),
	      rootNode            = React.useRef(),
	      [status, setStatus] = React.useState(closedStatus),
	      styles              = React.useMemo(
		      () => {
			      let colSize = (100 - padding * 2) / cols,
			          rowSize = (100 - padding * 2) / rows,
			          nbPages = ~~(launchers.All.length / (cols * rows)),
			          byId    = {},
			          items   = launchers.All.map(
				          ( item, i ) => {
					          const
						          launcher = launchers.All[i];
					
					          byId[launcher.id] =
						          {
							          id   : launchers.All[i].id,
							          launcher,
							          style: Voodoo.tools.addCss({
								                                     position : "absolute",
								                                     height   : launcherHeight,
								                                     width    : launcherWidth,
								                                     transform: [
									                                     {
										                                     translateX: "-50%",
										                                     translateY: "-50%",
									                                     }, {}
								                                     ]
							                                     }, launcherStyle),
							          axes : {
								          swipeDown: [],
								          swipeLeft: [
									          {
										          from    : 0,
										          duration: 100,
										          apply   : {
											          transform: [
												          {},
												          {
													          translateX: -(nbPages * width) + "px"
												          }
											          ]
										          }
									          },
								          ]
							          }
						          };
					          return byId[launcher.id];
				          }
			          );
			      launchers.Preview.forEach(
				      ( id, i ) => {
					      let left                               = ((padding + colSize / 2 + i * colSize) / 100) * width;
					      byId[id].style.transform[1].translateY = [-launcherHeight / 2, "0px"];
					      byId[id].style.transform[1].translateX = [left + "px", 0];
					      byId[id].left                          = left;
					      byId[id].axes.swipeDown
					              .push(
						              {
							              from    : 0,
							              duration: 40,
							              apply   : {
								              transform: [
									              ,
									              {
										              translateY: launcherHeight * 1.25,
									              }
								              ]
							              }
						              },
						              ...Voodoo.tools.scale(launcherEntering, 40)
					              )
				      }
			      )
			      launchers.All.forEach(
				      ( launcherDef, i ) => {
					      const
						      launcher = byId[launcherDef.id],
						      coll     = i % cols,
						      row      = ~~(i / cols) % (rows),
						      page     = ~~((i / cols) / (rows)),
						      top      = ((padding + rowSize / 2 + row * rowSize) / 100) * maximizedHeight,
						      left     = ((padding + colSize / 2 + coll * colSize) / 100) * width + page * width,
						      preview  = launchers.Preview.includes(launcher.id);
					      if ( preview ) {
						      launcher.axes.swipeDown
						              .push(
							              {
								              from    : 40,
								              duration: 60,
								              apply   : {
									              transform: [
										              ,
										              {
											              translateY: [-launcherHeight * .675 + top + "px"],
											              translateX: [-launcher.left + "px", left + "px"],
										              }
									              ]
								              }
							              }
						              )
					      }
					      else {
						      launcher.style.transform[1].translateY = [(top) + "px"];
						      launcher.style.transform[1].translateX = [(left + width) + "px", 0];
						      launcher.axes.swipeDown
						              .push(
							              {
								              from    : 40,
								              duration: 60,
								              apply   : {
									              transform: [
										              ,
										              {
											              translateX: -width + "px",
										              }
									              ]
								              }
							              },
							              ...Voodoo.tools.scale(launcherEntering, 60, 40)
						              )
					      }
				      }
			      )
			      return {
				      inverse  : ( delta ) => -delta,
				      container: {
					      position   : "absolute",
					      top        : "50%",
					      left       : "50%",
					      width      : "100%",
					      height     : "100%",
					      perspective: "400px",
					      transform  : "translate(-50%,-50%)",
					      overflow   : "hidden",
				      },
				      menu     : {
					      style: {
						      position       : "absolute",
						      top            : "0%",
						      left           : "0%",
						      width          : "100%",
						      height         : minimizedHeight,
						      backgroundColor: 'black'
					      },
					      axes : {
						      swipeDown: [
							      {
								      from    : 0,
								      duration: 40,
								      apply   : {
									      //top : [top + '%'],
									      height: [launcherHeight * 1.5],
								      }
							      },
							      {
								      from    : 40,
								      duration: 60,
								      apply   : {
									      //top : [top + '%'],
									      height: [maximizedHeight, -launcherHeight * 1.5],
								      }
							      },
							      {
								      type    : "Event",
								      from    : 0,
								      duration: 50,
								      entering: ( d ) => {
									      if ( d < 0 )
										      tweener.axes?.swipeLeft?.scrollTo(0, 200)
								      }
							      },
							      {
								      type    : "Event",
								      from    : 80,
								      duration: 20,
								      entering: ( d ) => {
									      if ( d > 0 )
										      setStatus(openStatus)
								      },
								      leaving: ( d ) => {
									      if ( d < 0 )
										      setStatus(closedStatus)
								      }
							      }
						      ]
					      }
				      },
				      topbar   : {
					      style: {
						      position       : "absolute",
						      bottom         : 0,
						      left           : "0%",
						      width          : "100%",
						      height         : minimizedHeight,
						      backgroundColor: 'black',
						      borderTop      : "solid 1px white",
						      borderBottom   : "solid 1px white"
					      },
					      axes : {
						      swipeDown: [
							      {
								      from    : 0,
								      duration: 40,
								      apply   : {
									      //borderBottom: "solid 5px red"
									      //opacity: -1
								      }
							      }
						      ]
					      }
				      },
				      vInertia : {
					      wayPoints: [{ at: 0 }, { at: 40 }, { at: 100 }],
				      },
				      hInertia : {
					      wayPoints: [{ at: 0 }, ...Array(nbPages).fill(true).map(( p, i ) => ({ at: (100 / nbPages) * (i + 1) }))],
				      },
				      byId,
				      items
			      };
		      }
		      , [launchers]
	      )
	;
	return <ViewBox className={"SwipeMenu"} style={styles.container} ref={rootNode}>
		<Voodoo.Axis
			axe={"swipeDown"}
			size={160}
			scrollableWindow={180}
			defaultPosition={0}
			inertia={styles.vInertia}
		/>
		<Voodoo.Axis
			axe={"swipeLeft"}
			defaultPosition={0}
			inertia={styles.hInertia}
		/>
		<Voodoo.Draggable
			className={"launchers"}
			yHook={styles.inverse}
			yAxis={"swipeDown"}
			xAxis={"swipeLeft"}
			//yBoxRef={ rootNode }
		>
			<Voodoo.Node
				axes={styles.menu.axes}
				style={styles.menu.style}
			>
				<div className={"header"}>
					{
						styles.items.map(
							( launcher, i ) =>
								<Voodoo.Node axes={launcher.axes}
								             style={launcher.style}
								             key={i}
								>
									<LauncherComp
										icon={launcher.launcher.icon}
										label={launcher.launcher.label}
									/>
								</Voodoo.Node>
						)
					}
					<Voodoo.Node
						axes={styles.topbar.axes}
						style={styles.topbar.style}
					>
						<div className={"topbar"}>
							{status}
						</div>
					</Voodoo.Node>
				</div>
			</Voodoo.Node>
		
		</Voodoo.Draggable>
	</ViewBox>;
}