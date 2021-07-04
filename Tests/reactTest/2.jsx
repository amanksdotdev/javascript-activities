import React, { useState, useEffect } from "react";

function Banner() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Boom");
    });

    const updateState = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={updateState}>State: {count}</button>
        </div>
    );
}

export default Banner;
