import React, { Component } from 'react'
import Promise from 'bluebird'
import './AnimateDiv.css'

class AnimateDiv extends Component {
    render() {
        return (
            <div className="path">
                <input type="button" value="START" onClick={this.animate.bind(this)} />
                <div ref={e => this.racer1 = e} className="racer green" />
                <div ref={e => this.racer2 = e} className="racer orange" />
                <div ref={e => this.racer3 = e} className="racer blue" />
            </div>
        );
    }

    changeMarginLeft(targetDiv, targetLeft, cb) {
        setTimeout(() => {
            if (targetDiv.style.marginLeft === targetLeft) {
                cb();
            } else {
                if (targetDiv.style.marginLeft < targetLeft) {
                    targetDiv.style.marginLeft = targetDiv.style.marginLeft + 1;
                } else {
                    targetDiv.style.marginLeft = targetDiv.style.marginLeft - 1;
                }

                changeMarginLeft(targetDiv, targetDiv, cb);
            }
        }, 13)
    }

    animate() {
        this.changeMarginLeft(this.racer1, 100)
    }
}