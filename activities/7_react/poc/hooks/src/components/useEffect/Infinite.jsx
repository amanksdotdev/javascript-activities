import React, { useEffect, useState } from "react";

function Infinite() {
    const [count, setCount] = useState(0);

    //this will go in infinite chain of updates
    useEffect(() => {
        console.log("useEffect");
        let num = Math.random() * 100;
        setCount(num);
    });

    console.log("render");
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>count++</button>
        </div>
    );
}

export default Infinite;
