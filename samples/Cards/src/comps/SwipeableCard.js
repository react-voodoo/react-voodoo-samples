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

export default ( { children, showBack } ) => {
    const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true }),
          [side, setSide]    = React.useState(showBack),
          styles             = React.useMemo(
              () => (
                  {
                      cardAxis     : {
                          swipeAxis: [
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
                                  type    : "Event",
                                  from    : 50,
                                  duration: .01,
                                  entering: ( pos ) => {
                                      //setSide(pos === 1)
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
                          ]
                      },
                      cardStyle    : {
                          position : "absolute",
                          top      : "50%",
                          left     : "50%",
                          width    : "100%",
                          height   : "100%",
                          transform: [
                              { translateX: "-50%", translateY: "-50%" }
                          ],
                      },
                      cardHoverAnim: [
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
                      ],
                      inertia      : {
                          wayPoints: [{ at: 0 }, { at: 100 }],
                      }
                  }
              ), []
          ),
          mouseEnter         = () => {
              tweener.scrollTo(100, 500, "hovering")
          },
          mouseLeave         = () => {
              tweener.scrollTo(0, 500, "hovering")
          };
    return <ViewBox
        className={ "SwipeableCard" }
        style={ { perspective: "400px" } }
    >
        <Voodoo.Axis
            axe={ "swipeAxis" }
            scrollableWindow={ 100 }
            defaultPosition={ 0 }
            inertia={ styles.inertia }
        />
        <Voodoo.Axis
            axe={ "hovering" }
            items={ styles.cardHoverAnim }
            defaultPosition={ 0 }
        />
        <Voodoo.Node id="card"
                     tweenAxis={ styles.cardAxis }
                     style={ styles.cardStyle }
                     onMouseEnter={ mouseEnter }
                     onMouseLeave={ mouseLeave }>
            <Voodoo.Draggable className={ "card" }
                              xAxis={ "swipeAxis" }>
                { children?.[ side ? 1 : 0 ] }
            </Voodoo.Draggable>
        </Voodoo.Node>
    </ViewBox>;
}
