import React, { Component } from 'react'
import { Link } from 'react-router'
import { PATH_PARALLEL, PATH_SEQUENCE } from './Consts'

class Navigator extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to={PATH_PARALLEL} >并行</Link></li>
                    <li><Link to={PATH_SEQUENCE}>顺序</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Navigator