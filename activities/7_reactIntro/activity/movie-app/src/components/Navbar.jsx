import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    //useState returns pair of values, 1) current state 2) a function that is used to change state
    const [active, setActive] = useState("home");

    function handleChange(e) {
        let clickedItem = e.target.innerText.trim().toLowerCase();
        setActive(clickedItem);
    }

    return (
        <div className="navbar mb-5">
            <h1 className="logo">Movies List</h1>
            <ul className="list">
                <li>
                    <Link
                        onClick={handleChange}
                        className={active === "home" ? "link active" : "link"}
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={handleChange}
                        className={active === "movies" ? "link active" : "link"}
                        to="/movies"
                    >
                        Movies
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={handleChange}
                        className={active === "about" ? "link active" : "link"}
                        to="/about"
                    >
                        About
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
