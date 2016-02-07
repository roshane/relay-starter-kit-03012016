import React from 'react';
import Link from 'react-router';

class Header extends React.Component {
    render() {
        return <div className="nav navbar-default">
            <ul className="nav navbar-nav">
                <li>
                    <a href="#">
                        <i className="glyphicon glyphicon-home"/>
                    </a>
                </li>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#add">Add Feedback</a>
                </li>
            </ul>
        </div>
    }
}

export default Header;