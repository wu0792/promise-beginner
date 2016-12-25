import React, { Component } from 'react'
import { MOVE_SPEED } from './Consts'
import Promise from 'bluebird'
import './AnimateDiv.css'

class SomeMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: ''
        }
    }

    render() {
        return (
            <div className="path">
                <h3>指定数量的事件完成后触发</h3>
                <h4>用于要求指定数目Promise对象resolve后触发，将多个Promise组合成为一个Promise，使用spread接收组合前多个Promise的resolve方法参数，如果reject数量过多，无法满足“指定数目Promise触发”，则会导致合成后Promise报错，触发Error</h4>
                <input type="button" className="button" value="START_1(1 promise fulfilled)" onClick={this.animate1.bind(this)} />
                <input type="button" className="button" value="START_2(2 promise fulfilled)" onClick={this.animate2.bind(this)} />
                <input type="button" className="button" value="START_3(3 promise fulfilled)" onClick={this.animate3.bind(this)} />

                <div ref={e => this.racer1 = e} style={{ marginLeft: 0 }} className="racer grey" />
                <div ref={e => this.racer2 = e} style={{ marginLeft: 0 }} className="racer orange" />
                <div ref={e => this.racer3 = e} style={{ marginLeft: 0 }} className="racer blue" />

                <div>{this.state.msg}</div>
            </div>
        );
    }

    changeMarginLeft(tag, targetDiv, targetLeft, cb) {
        let _this = this
        let speed = MOVE_SPEED / 2
        setTimeout(() => {
            let currentMarginLeft = +targetDiv.style.marginLeft.replace('px', '')
            if (Math.abs(currentMarginLeft - targetLeft) < speed) {
                cb && cb(tag)
            } else {
                if (currentMarginLeft < targetLeft) {
                    targetDiv.style.marginLeft = `${currentMarginLeft + speed}px`
                } else {
                    targetDiv.style.marginLeft = `${currentMarginLeft - speed}px`
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

        Promise.some(animateList, 1).spread((tag1) => {
            _this.setState({ msg: `WHEN 1 ANIMATION FINISHED, WE RECEIVED THE FOLLOWING MESSAGES: ${tag1}` })
        })
    }

    animate2() {
        this.reset()
        let _this = this;

        let animateList = [
            this.promiseAnimate('NO1', this.racer1, 100),
            this.promiseAnimate('NO2', this.racer2, 200),
            this.promiseAnimate('NO3', this.racer3, 300)
        ]

        Promise.some(animateList, 2).spread((tag1, tag2) => {
            _this.setState({ msg: `WHEN 2 ANIMATION FINISHED, WE RECEIVED THE FOLLOWING MESSAGES: ${tag1},${tag2}` })
        }, (error) => {
            debugger;
        })
    }

    animate3() {
        this.reset()
        let _this = this;

        let animateList = [
            this.promiseAnimate('NO1', this.racer1, 100),
            this.promiseAnimate('NO2', this.racer2, 200),
            this.promiseAnimate('NO3', this.racer3, 300)
        ]

        Promise.some(animateList, 3)
            .then((tags) => {
                _this.setState({ msg: `WHEN 3 ANIMATION FINISHED, WE RECEIVED THE FOLLOWING MESSAGES: ${[...tags]}` })
            })
            .catch((err) => {
                _this.setState({ msg: `WHEN 3 ANIMATION CANNOT FINISHED, WE RECEIVED THE FOLLOWING error: ${err}` })
            })
    }

    promiseAnimate(tag, targetDiv, targetLeft) {
        let _this = this
        return new Promise((resolve, reject) => {
            if (tag === 'NO3') {
                reject && reject(new Error('TOO MANY..'))
            } else {
                _this.changeMarginLeft(tag, targetDiv, targetLeft, resolve)
            }
        })
    }
}

export default SomeMethod