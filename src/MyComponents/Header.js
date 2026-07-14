import React from 'react';
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <nav className="header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    {props.title}
                </Link>

                <div className="header-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </div>
            </div>
        </nav>
    );
}

Header.defaultProps = {
    title: "My Todos List"
};
