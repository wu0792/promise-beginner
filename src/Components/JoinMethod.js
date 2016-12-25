import React, { Component } from 'react'
import { MOVE_SPEED } from './Consts'
import Promise from 'bluebird'
import './AnimateDiv.css'

class JoinMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: ''
        }
    }

    render() {
        return (
            <div className="path">
                <h3>Join连接，各事件完成后触发</h3>
                <h4>用于固定数目Promise对象的同时触发，回调函数接收相同数目的参数，效率高于All</h4>
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
        let _this = this;

        let animateList = [
            this.promiseAnimate('NO1', this.racer1, 100),
            this.promiseAnimate('NO2', this.racer2, 200),
            this.promiseAnimate('NO3', this.racer3, 300)
        ]

        Promise.join(
            this.promiseAnimate('NO1', this.racer1, 100),
            this.promiseAnimate('NO2', this.racer2, 200),
            this.promiseAnimate('NO3', this.racer3, 300)
            , (tag1, tag2, tag3) => {
                _this.setState({ msg: `WHEN EVERYTHING FINISHED, WE RECEIVED THE FOLLOWING MESSAGES: ${tag1}, ${tag2}, ${tag3}` })
            })
    }

    promiseAnimate(tag, targetDiv, targetLeft) {
        let _this = this
        return new Promise((resolve, reject) => {
            _this.changeMarginLeft(tag, targetDiv, targetLeft, resolve)
        })
    }
}

export default JoinMethod