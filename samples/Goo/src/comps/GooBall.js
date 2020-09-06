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
export default class GooBall extends React.Component {
    
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
    
    constructor( props ) {
        super(...arguments);
        this.nextTarget = {
            scrollX: 200 - props.defaultPosition.x * 200,
            scrollY: 200 - props.defaultPosition.y * 200
        };
    }
    
    pushGoTo = ( nextTarget ) => {
        let tweener    = this.props.tweener,
            target     = {
                y: 200 - nextTarget.scrollY,
                x: 200 - nextTarget.scrollX
            },
            lastTarget = this.currentTarget,
            tween;
        
        target.y /= 200;
        target.x /= 200;
        target.y = Math.min(1, Math.max(0, target.y.toFixed(3)));
        target.x = Math.min(1, Math.max(0, target.x.toFixed(3)));
        
        if ( !lastTarget ) {
            return this.currentTarget = target;
        }
        
        this.currentTarget = target;
        
        tween = {
            transform: {
                translateX: ( target.x - lastTarget.x ) + "box",
                translateY: ( target.y - lastTarget.y ) + "box"
            }
        };
        tweener.pushAnim(
            [
                {
                    target  : "goo3",
                    duration: 200,
                    apply   : tween
                },
                {
                    target  : "goo2",
                    duration: 300,
                    apply   : tween
                }
            ]);
    }
    ;
    
    componentDidScroll( pos, axis ) {
        let now                 = Date.now();
        this.nextTarget[ axis ] = pos;
        this._pendingGotoTm && clearTimeout(this._pendingGotoTm);
        // mano debounce
        if ( now - this.lastTm < 50 )
            return this._pendingGotoTm = setTimeout(tm => this.componentDidScroll(pos, axis), 50);
        this.lastTm = now;
        this.pushGoTo(this.nextTarget)
    }
    
    static getDerivedStateFromProps( props, state ) {
        let { color, style, defaultPosition } = props;
        return {
            style    : {
                ...style,
                backgroundColor: color,
                transform      : [
                    {
                        translateX: "0box",
                        translateY: "0box",
                    },
                    {
                        translateX: "-50%",
                        translateY: "-50%",
                    },
                ]
            },
            styleBall: {
                ...style,
                backgroundColor: color,
                top            : "0%",
                left           : "0%",
                transform      : [
                    {
                        translateX: defaultPosition.x + "box",
                        translateY: defaultPosition.y + "box",
                    },
                    {
                        translateX: "-50%",
                        translateY: "-50%",
                    },
                ]
            },
            ballAxis : {
                scrollX: [
                    {
                        from    : 0,
                        duration: 200,
                        apply   : {
                            transform: {
                                translateX: "-1box"
                            },
                        }
                    },
                ],
                scrollY: [
                    {
                        from    : 0,
                        duration: 200,
                        apply   : {
                            transform: {
                                translateY: "-1box"
                            },
                        }
                    },
                ]
            }
        }
    }
    
    inertiaX = {
        willEnd( targetPos, targetDelta, duration ) {
            console.log('inertiaX::willEnd:183: ', targetPos, targetDelta, duration);
        }
    };
    inertiaY = {
        willEnd( targetPos, targetDelta, duration ) {
            console.log('inertiaY::willEnd:183: ', targetPos, targetDelta, duration);
        }
    };
    
    render() {
        let { defaultPosition } = this.props;
        return <Voodoo.Draggable
            yAxis={ "scrollY" } xAxis={ "scrollX" }
            className={ "GooBall" }>
            <Voodoo.Axis axe={ "scrollY" }
                         defaultPosition={ 200 - defaultPosition.y * 200 }
                         inertia={ this.inertiaY }/>
            <Voodoo.Axis axe={ "scrollX" }
                         defaultPosition={ 200 - defaultPosition.x * 200 }
                         inertia={ this.inertiaX }/>
            
            <Voodoo.Node.div id={ "goo2" }
                             initial={ this.state.styleBall }
                             className={ "ball" }/>
            <Voodoo.Node.div id={ "goo3" }
                             initial={ this.state.styleBall }
                             className={ "ball" }/>
            <Voodoo.Node.div id={ "goo1" }
                             tweenAxis={ this.state.ballAxis }
                             initial={ this.state.style }
                             className={ "ball" }/>
        </Voodoo.Draggable>;
    }
}