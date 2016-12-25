import React, { Component } from 'react'
import { Link } from 'react-router'
import { PATH_PARALLEL, PATH_SEQUENCE, PATH_ALL_METHOD, PATH_JOIN_METHOD, PATH_SOME_METHOD, PATH_MAP_METHOD, PATH_TIMEOUT_METHOD, PATH_CONCURRENCY_OPTION } from './Consts'
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
                    <li><Link to={PATH_SOME_METHOD}>SOME</Link></li>
                    <li><Link to={PATH_MAP_METHOD}>MAP</Link></li>
                    <li><Link to={PATH_TIMEOUT_METHOD}>TIMEOUT</Link></li>
                    <li><Link to={PATH_CONCURRENCY_OPTION}>CONCURRENCY</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Navigator