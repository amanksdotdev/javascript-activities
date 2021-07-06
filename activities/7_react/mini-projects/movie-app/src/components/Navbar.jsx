import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

// custom hook to get the current pathname in React
const usePathname = () => {
    const location = useLocation();
    const pathname = location.pathname;
    let activePath = pathname === "/" ? "home" : pathname;
    if (activePath !== "home") activePath = pathname.split("/").pop();
    return activePath;
};

function Navbar() {
    console.log("render");
    const activePath = usePathname();
    //useState returns pair of values, 1) current state; 2) a function that is used to change state
    const [active, setActive] = useState(activePath);

    //same as componentDidMount and componentDidUpdate
    //updates documents title when link is clicked and state is updated
    useEffect(() => {
        console.log("useEffect");
        document.title = `moviecrud | ${active}`;
    }, [active]); // only runs when active changes

    const handleChange = (e) => {
        let clickedPath = e.target.innerText.trim().toLowerCase();
        setActive(clickedPath);
    };

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
