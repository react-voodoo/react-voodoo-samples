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

import React                       from "react";
import ReactDom                    from "react-dom";
import Voodoo                      from "react-voodoo";
import icons                       from "./icons/(*).png";
import { SwipeMenu, GithubCorner } from "./comps/(*).js";

const allIcons = Object.keys(icons).map(( name, i ) => ( {
    
    id   : "App" + i,
    icon : icons[ name ],
    label: name
} ))

import "./index.scss";


const Sample = () => {
    
    
    return <>
        
        <GithubCorner/>
        <div className={ "desk" }>
            <SwipeMenu
                launchers={ {
                    All    : [
                        ...allIcons.slice(0, 20)
                    ],
                    Preview: ["App1", "App2", "App8", "App10"]
                } }>
                <div className={ "notif" }>
                    notification
                </div>
            </SwipeMenu>
            desk
        </div>
    </>
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