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
import icons    from "./icons/(*).png";

const allIcons = Object.keys(icons).map(( name, i ) => ( {
    
    id   : "App" + i,
    icon : icons[ name ],
    label: name
} ))

import "./index.scss";


const Launcher = ( { label, icon, nodeRef, ...props } ) => {
    return <div className={ "launcher" } { ...props } ref={ nodeRef }>
        <img src={ icon }/>
        { label }
    </div>
}

const AndroidMenu = (
    {
        children,
        rows = 4,
        cols = 4,
        LauncherComp = Launcher,
        padding = 5,
        minimizedHeight = 30,
        maximizedHeight = 400,
        launchers,
        launcherStyle = {
            opacity  : 0,
            transform: [
                {
                    perspective: "200px",
                },
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
                        {
                            rotateX   : "-90deg",
                            rotateZ   : "-90deg",
                            translateZ: "-20px"
                        }
                    ]
                }
            },
        ]
    }
      ) => {
          const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
                styles             = React.useMemo(
                    () => {
                        let coll    = 0,
                            row     = 0,
                            colSize = ( 100 - padding * 2 ) / cols,
                            rowSize = ( 100 - padding * 2 ) / rows,
                            nbPages = ~~( launchers.All.length / ( cols * rows ) ),
                            byId    = {},
                            items   = launchers.All.map(
                                ( item, i ) => {
                                    const
                                        launcher = launchers.All[ i ];
                    
                                    byId[ launcher.id ] =
                                        {
                                            id   : launchers.All[ i ].id,
                                            launcher,
                                            style: Voodoo.tools.addCss({
                                                                           position : "absolute",
                                                                           height   : "64px",
                                                                           width    : "64px",
                                                                           transform: [
                                                                               {
                                                                                   translateX: "-50%",
                                                                                   translateY: "-50%",
                                                                               }
                                                                           ]
                                                                       }, launcherStyle),
                                            axes : {
                                                swipeDown: [],
                                                swipeLeft: [
                                                    {
                                                        from    : 0,
                                                        duration: 100,
                                                        apply   : {
                                                            left: -( nbPages * 100 ) + "%",
                                                        }
                                                    },
                                                ]
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
                                              },
                                              ...Voodoo.tools.scale(launcherEntering, 40)
                                          )
                            }
                        )
                        launchers.All.forEach(
                            ( launcherDef, i ) => {
                                const
                                    launcher = byId[ launcherDef.id ],
                                    coll     = i % cols,
                                    row      = ~~( i / cols ) % ( rows ),
                                    page     = ~~( ( i / cols ) / ( rows ) ),
                                    top      = ( padding + rowSize / 2 + row * rowSize ),
                                    left     = ( padding + colSize / 2 + coll * colSize ) + page * 100,
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
                                                },
                                                ...Voodoo.tools.scale(launcherEntering, 60, 40)
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
                                                height: ["96px"],
                                            }
                                        },
                                        {
                                            from    : 40,
                                            duration: 60,
                                            apply   : {
                                                //top : [top + '%'],
                                                height: [maximizedHeight, "-96px", -minimizedHeight],
                                            }
                                        }
                                    ]
                                }
                            },
                            topbar     : {
                                style: {
                                    position       : "absolute",
                                    top            : "0%",
                                    left           : "0%",
                                    width          : "100%",
                                    height         : 30,
                                    backgroundColor: 'black'
                                },
                                axes : {
                                    swipeDown: [
                                        {
                                            from    : 0,
                                            duration: 40,
                                            apply   : {
                                                opacity:-1
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
                                    
                                                height: [maximizedHeight, 96],
                                                top   : [maximizedHeight, "-96px", -minimizedHeight],
                                            }
                                        }
                                    ]
                                }
                            },
                            vInertia : {
                                wayPoints: [{ at: 0 }, { at: 40 }, { at: 100 }],
                            },
                            hInertia : {
                                wayPoints: [{ at: 0 }, ...Array(nbPages).fill(true).map(( p, i ) => ( { at: ( 100 / nbPages ) * ( i + 1 ) } ))],
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
                  inertia={ styles.vInertia }
              />
              <Voodoo.Axis
                  axe={ "swipeLeft" }
                  scrollableWindow={ 80 }
                  defaultPosition={ 0 }
                  inertia={ styles.hInertia }
              />
              <Voodoo.Draggable
                  className={ "launchers" }
                  yHook={ styles.inverse }
                  yAxis={ "swipeDown" }
                  xAxis={ "swipeLeft" }
              >
                  <Voodoo.Node
                      axes={ styles.menu.axes }
                      style={ styles.menu.style }
                  >
                      <div className={ "header" }>
                          {
                              styles.items.map(
                                  ( launcher, i ) =>
                                      <Voodoo.Node axes={ launcher.axes }
                                                   style={ launcher.style }
                                                   key={ i }
                                      >
                                          <LauncherComp
                                              icon={ launcher.launcher.icon }
                                              label={ launcher.launcher.label }
                                          />
                                      </Voodoo.Node>
                              )
                          }
                          <Voodoo.Node
                              axes={ styles.topbar.axes }
                              style={ styles.topbar.style }
                          >
                              <div className={ "topbar" }>
                                  Swipe me down !
                              </div>
                          </Voodoo.Node>
                      </div>
                  </Voodoo.Node>
            
                  <Voodoo.Node
                      axes={ styles.notifs.axes }
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
          <AndroidMenu
              launchers={ {
                  All    : [
                      ...allIcons.slice(0, 20)
                  ],
                  Preview: ["App1", "App2", "App8", "App10"]
              } }>
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