import React, { Component } from 'react'
import {MOVE_SPEED} from './Consts'
import Promise from 'bluebird'
import './AnimateDiv.css'

class SequentialAnimateDiv extends Component {
    render() {
        return (
            <div className="path">
                <h3>按顺序依次开始各个事件</h3>
                <input type="button" className="button" value="START_1" onClick={this.animate1.bind(this)} />
                <input type="button" className="button" value="START_2" onClick={this.animate2.bind(this)} />

                <div ref={e => this.racer1 = e} style={{ marginLeft: 0 }} className="racer grey" />
                <div ref={e => this.racer2 = e} style={{ marginLeft: 0 }} className="racer orange" />
                <div ref={e => this.racer3 = e} style={{ marginLeft: 0 }} className="racer blue" />
            </div>
        );
    }

    changeMarginLeft(targetDiv, targetLeft, cb) {
        let _this = this
        setTimeout(() => {
            let currentMarginLeft = +targetDiv.style.marginLeft.replace('px', '')
            if (Math.abs(currentMarginLeft - targetLeft) < MOVE_SPEED) {
                cb && cb()
            } else {
                if (currentMarginLeft < targetLeft) {
                    targetDiv.style.marginLeft = `${currentMarginLeft + MOVE_SPEED}px`
                } else {
                    targetDiv.style.marginLeft = `${currentMarginLeft - MOVE_SPEED}px`
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

        this.changeMarginLeft(this.racer1, 100, () => {
            this.changeMarginLeft(this.racer2, 200, () => {
                this.changeMarginLeft(this.racer3, 300)
            })
        })
    }

    promiseAnimate(targetDiv, targetLeft) {
        let _this = this
        return new Promise((resolve, reject) => {
            _this.changeMarginLeft(targetDiv, targetLeft, resolve)
        })
    }

    animate2() {
        this.reset()

        this.promiseAnimate(this.racer1, 100)
            .then(() => { console.log('race2 start'); return this.promiseAnimate(this.racer2, 200) })
            .then(() => { console.log('race3 start'); return this.promiseAnimate(this.racer3, 300) })
    }
}

export default SequentialAnimateDiv