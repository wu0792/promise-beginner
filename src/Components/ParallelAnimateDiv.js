import React, { Component } from 'react'
import Promise from 'bluebird'
import './AnimateDiv.css'

class AnimateDiv extends Component {
    render() {
        return (
            <div className="path">
                <h3>同时开始多个事件</h3>
                <input type="button" className="button" value="START_1" onClick={this.animate1.bind(this)} />
                <input type="button" className="button" value="START_2" onClick={this.animate2.bind(this)} />

                <div ref={e => this.racer1 = e} style={{ marginLeft: 0 }} className="racer grey" />
                <div ref={e => this.racer2 = e} style={{ marginLeft: 0 }} className="racer orange" />
                <div ref={e => this.racer3 = e} style={{ marginLeft: 0 }} className="racer blue" />
            </div>
        );
    }

    changeMarginLeft(targetDiv, targetLeft, cb) {
        let _this = this;
        setTimeout(() => {
            let currentMarginLeft = +targetDiv.style.marginLeft.replace('px', '');
            if (currentMarginLeft === targetLeft) {
                cb && cb();
            } else {
                if (currentMarginLeft < targetLeft) {
                    targetDiv.style.marginLeft = `${currentMarginLeft + 1}px`;
                } else {
                    targetDiv.style.marginLeft = `${currentMarginLeft - 1}px`;
                }

                _this.changeMarginLeft(targetDiv, targetLeft, cb);
            }
        }, 13)
    }

    reset() {
        this.racer1.style.marginLeft = 0
        this.racer2.style.marginLeft = 0
        this.racer3.style.marginLeft = 0
    }

    animate1() {
        this.reset()

        this.changeMarginLeft(this.racer1, 100)
        this.changeMarginLeft(this.racer2, 200)
        this.changeMarginLeft(this.racer3, 300)
    }

    promiseAnimate(nextAction) {
        return new Promise((resolve, reject) => {
            nextAction && nextAction()
        })
    }

    animate2() {
        this.reset()

        this.promiseAnimate(this.changeMarginLeft(this.racer1, 100))
            .then(this.changeMarginLeft(this.racer2, 200))
            .then(this.changeMarginLeft(this.racer3, 300))
    }
}

export default AnimateDiv