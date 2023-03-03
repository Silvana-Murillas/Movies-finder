import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Landing = () => {
    return (
        <div className="landing">
            <img
                src="https://external-preview.redd.it/Z-mdOCdgw53wluJKQdklW2-WwJEcd3zXoER3YNl-euI.jpg?auto=webp&s=9da2a0406734c547c7bc489c5fa20b091c7ee86c"
                alt="background"
            ></img>
            <h1>Movies finder</h1>
            <button className="btn-l">
                <NavLink
                    to="/search"
                    style={{ textDecoration: 'none', color: 'white' }}
                >
                    Start
                </NavLink>
            </button>
        </div>
    );
};
