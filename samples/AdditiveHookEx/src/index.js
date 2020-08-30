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
import Comps    from "./comps/(*).js"

import "./index.scss";

const Sample = ( {} ) => {
    const [ViewBox, tweener]      = Voodoo.hook(),
          [showBack, setShowBack] = React.useState(false),
          cardAxis                = React.useMemo(
              () => (
                  {
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
                                  setShowBack(pos === 1)
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
                  }
              ), []
          ),
          cardStyle               = React.useMemo(
              () => (
                  {
                      position       : "absolute",
                      top            : "50%",
                      left           : "50%",
                      width          : "50px",
                      height         : "50px",
                      backgroundColor: "red",
                      transform      : [
                          { translateX: "-50%", translateY: "-50%" }
                      ],
                  }
              ), []
          );
    return <ViewBox className={ "container" }>
        <Voodoo.Axis
            axe={ "swipeAxis" }
            scrollableWindow={ 400 }
            //items={ this._flipEvent }
            defaultPosition={ 0 }
            //inertia={ this.inertia }
        />
        <Voodoo.Node id="card"
                     tweenAxis={ cardAxis }
                     style={ cardStyle }>
            <Voodoo.Draggable
                xAxis={ "swipeAxis" }
                className={ "SwipeableCard" }>
                <div className={ "card" }>
                    test { showBack ? "true" : "false" }
                </div>
            </Voodoo.Draggable>
        </Voodoo.Node>
    </ViewBox>;
}


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