import React, { Component } from 'react'
import { MOVE_SPEED } from './Consts'
import Promise from 'bluebird'
import './AnimateDiv.css'

class ConcurrencyOption extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: ''
        }
    }

    render() {
        return (
            <div className="path">
                <h3>concurrency选项</h3>
                <h4>map函数中使用concurrency选项控制并发数</h4>
                <input type="button" className="button" value="START_1" onClick={this.animate1.bind(this)} />

                <div ref={e => this.racer1 = e} style={{ marginLeft: 0 }} className="racer grey" />
                <div ref={e => this.racer2 = e} style={{ marginLeft: 0 }} className="racer orange" />
                <div ref={e => this.racer3 = e} style={{ marginLeft: 0 }} className="racer blue" />

                <div>{this.state.msg}</div>
            </div>
        );
    }

    changeMarginLeft(tag, targetDiv, targetLeft, cb) {
        let _this = this
        setTimeout(() => {
            let currentMarginLeft = +targetDiv.style.marginLeft.replace('px', '')
            if (Math.abs(currentMarginLeft - targetLeft) < MOVE_SPEED) {
                cb && cb(tag)
            } else {
                if (currentMarginLeft < targetLeft) {
                    targetDiv.style.marginLeft = `${currentMarginLeft + MOVE_SPEED}px`
                } else {
                    targetDiv.style.marginLeft = `${currentMarginLeft - MOVE_SPEED}px`
                }

                _this.changeMarginLeft(tag, targetDiv, targetLeft, cb);
            }
        }, 13)
    }

    reset() {
        this.racer1.style.marginLeft = 0
        this.racer2.style.marginLeft = 0
        this.racer3.style.marginLeft = 0

        this.setState({ msg: '' })
    }

    animate1() {
        this.reset()
        let _this = this

        let idList = [1, 2, 3]
        Promise
            .map(idList, (id) => { return this.promiseAnimate(`NO${id}`, this[`racer${id}`], 100 * (+id)) }, { concurrency: 2 })
            .then((tags) => {
                _this.setState({ msg: `WHEN EVERYTHING FINISHED, WE RECEIVED THE FOLLOWING MESSAGES: ${[...tags]}` })
            })
    }

    promiseAnimate(tag, targetDiv, targetLeft) {
        let _this = this
        return new Promise((resolve, reject) => {
            _this.changeMarginLeft(tag, targetDiv, targetLeft, resolve)
        })
    }
}

export default ConcurrencyOption