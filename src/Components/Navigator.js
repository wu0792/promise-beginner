import React, { Component } from 'react'
import { Link } from 'react-router'
import { PATH_PARALLEL, PATH_SEQUENCE, PATH_ALL_METHOD, PATH_JOIN_METHOD } from './Consts'
import './AnimateDiv.css'

class Navigator extends Component {
    render() {
        return (
            <div>
                <ul className='nav'>
                    <li><Link to={PATH_PARALLEL}>[NONE]</Link></li>
                    <li><Link to={PATH_SEQUENCE}>THEN</Link></li>
                    <li><Link to={PATH_ALL_METHOD}>ALL</Link></li>
                    <li><Link to={PATH_JOIN_METHOD}>JOIN</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Navigator