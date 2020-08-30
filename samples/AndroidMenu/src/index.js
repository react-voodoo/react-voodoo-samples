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

import React    from "react";
import ReactDom from "react-dom";
import Voodoo   from "react-voodoo";

import "./index.scss";

const AndroidMenu = (
    {
        children,
        rows = 5,
        cols = 4,
        padding = 5
    }
      ) => {
          const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
                launchers          = React.useMemo(
                    () => (
                        {
                            All    : [
                                ...Array(16).fill(true).map(
                                    ( item, i ) =>
                                        ( {
                                            id   : "App" + i,
                                            icon : "https://source.unsplash.com/200x200/?icon",
                                            label: "App" + i
                                        } )
                                )
                            ],
                            Preview: ["App1", "App2", "App8", "App10"]
                        }
                    )
                ),
                styles             = React.useMemo(
                    () => {
                        let coll    = 0,
                            row     = 0,
                            colSize = ( 100 - padding * 2 ) / cols,
                            rowSize = ( 100 - padding * 2 ) / rows,
                            byId    = {},
                            items   = launchers.All.map(
                                ( item, i ) => {
                                    const
                                        launcher = launchers.All[ i ];
                    
                                    byId[ launcher.id ] =
                                        {
                                            id   : launchers.All[ i ].id,
                                            launcher,
                                            style: {
                                                position : "absolute",
                                                //top            : [preview
                                                //                  ? "0%"
                                                //                  : top + "%", "-32px"],
                                                //left           : ( preview
                                                //                   ? left
                                                //                   : left + 100 ) + "%",
                                                height   : "64px",
                                                width    : "64px",
                                                //backgroundColor: 'red',
                                                transform: [
                                                    {
                                                        translateX: "-50%",
                                                        translateY: "-50%",
                                                    },
                                                    {}
                                                ]
                                            },
                                            axes : {
                                                swipeDown: [],
                                                swipeLeft: []
                                            }
                                        };
                                    return byId[ launcher.id ];
                                }
                            );
                        launchers.Preview.forEach(
                            ( id, i ) => {
                                let left              = ( padding + colSize / 2 + i * colSize );
                                byId[ id ].style.top  = ["-32px", "0%"];
                                byId[ id ].style.left = [left + "%", 0];
                                byId[ id ].left       = left;
                                byId[ id ].axes.swipeDown
                                          .push(
                                              {
                                                  from    : 0,
                                                  duration: 40,
                                                  apply   : {
                                                      top: '96px',
                                                  }
                                              }
                                          )
                            }
                        )
                        launchers.All.forEach(
                            ( launcherDef, i ) => {
                                const
                                    launcher = byId[ launcherDef.id ],
                                    coll     = i % cols,
                                    row      = ~~( i / cols ),
                                    top      = ( padding + rowSize / 2 + row * rowSize ),
                                    left     = ( padding + colSize / 2 + coll * colSize ),
                                    preview  = launchers.Preview.includes(launcher.id);
                                if ( preview ) {
                                    launcher.axes.swipeDown
                                            .push(
                                                {
                                                    from    : 40,
                                                    duration: 60,
                                                    apply   : {
                                                        top : ["-64px", top + '%'],
                                                        left: [-launcher.left + "%", left + "%"]
                                                    }
                                                }
                                            )
                                }
                                else {
                                    launcher.style.top  = ["0px", top + "%"];
                                    launcher.style.left = ( left + 100 ) + "%";
                                    launcher.axes.swipeDown
                                            .push(
                                                {
                                                    from    : 40,
                                                    duration: 60,
                                                    apply   : {
                                                        left: "-100%",
                                                    }
                                                }
                                            )
                                }
                            }
                        )
                        return {
                            inverse  : ( delta ) => -delta,
                            container: {
                                position : "absolute",
                                top      : "50%",
                                left     : "50%",
                                width    : "100%",
                                height   : "100%",
                                //backgroundColor: 'green',
                                transform: "translate(-50%,-50%)",
                                overflow : "hidden",
                            },
                            menu     : {
                                style: {
                                    position       : "absolute",
                                    top            : "0%",
                                    left           : "0%",
                                    width          : "100%",
                                    height         : "15px",
                                    backgroundColor: 'black'
                                },
                                axes : {
                                    swipeDown: [
                                        {
                                            from    : 0,
                                            duration: 40,
                                            apply   : {
                                                //top : [top + '%'],
                                                height: ["96px"],
                                            }
                                        },
                                        {
                                            from    : 40,
                                            duration: 60,
                                            apply   : {
                                                //top : [top + '%'],
                                                height: ["70%", "-96px", "-15px"],
                                            }
                                        }
                                    ]
                                }
                            },
                            notifs   : {
                                style: {
                                    position: "absolute",
                                    top     : "15px",
                                    left    : "0%",
                                    width   : "100%",
                                    height  : "0px",
                                    //backgroundColor: 'yellow',
                                    overflow: "hidden"
                                },
                                axes : {
                                    swipeDown: [
                                        {
                                            from    : 0,
                                            duration: 40,
                                            apply   : {
                                                height: [100 + '%', -96],
                                                top   : ["96px"],
                                            }
                                        },
                                        {
                                            from    : 40,
                                            duration: 60,
                                            apply   : {
                                    
                                                height: [-70 + '%', 96],
                                                top   : ["70%", "-96px", "-15px"],
                                            }
                                        }
                                    ]
                                }
                            },
                            inertia  : {
                                wayPoints: [{ at: 0 }, { at: 40 }, { at: 100 }],
                            },
                            byId,
                            items
                        };
                    }
                    , [launchers]
                )
          ;
          return <ViewBox className={ "AndroidMenu" } style={ styles.container }>
              <Voodoo.Axis
                  axe={ "swipeDown" }
                  scrollableWindow={ 80 }
                  defaultPosition={ 0 }
                  inertia={ styles.inertia }
              />
              <Voodoo.Draggable
                  className={ "launchers" }
                  yHook={ styles.inverse }
                  yAxis={ "swipeDown" }
              >
                  <Voodoo.Node
                      tweenAxis={ styles.menu.axes }
                      style={ styles.menu.style }
                  >
                      <div className={ "header" }>
                    
                          {
                              styles.items.map(
                                  ( launcher, i ) =>
                                      <Voodoo.Node tweenAxis={ launcher.axes }
                                                   style={ launcher.style }
                                                   key={ i }
                                      >
                                          <div className={ "launcher" }>
                                              <img src={ launcher.launcher.icon }/>
                                          </div>
                                      </Voodoo.Node>
                              )
                          }
                      </div>
                  </Voodoo.Node>
            
                  <Voodoo.Node
                      tweenAxis={ styles.notifs.axes }
                      style={ styles.notifs.style }
                  >
                      <div className={ "notifications" }>
                          { children }
                      </div>
                  </Voodoo.Node>
              </Voodoo.Draggable>
          </ViewBox>;
      },
      Sample      = () => <div className={ "desk" }>
          <AndroidMenu>
              <div className={ "notif" }>
                  notification
              </div>
          </AndroidMenu>
          desk
      </div>


document.body.innerHTML = '<div id="app"></div>';

function renderSample() {
    ReactDom.render(
        <Sample/>
        , document.getElementById('app'));
    
}

renderSample()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
    module.hot.accept('.', renderSample);
}