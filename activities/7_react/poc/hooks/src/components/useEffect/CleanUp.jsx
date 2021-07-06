import React, { useState, useEffect } from "react";

function CleanUp() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("useEffect");
        document.title = count;

        //clean up
        return () => {
            alert("Called before the next useEffect is called " + count);
        };
    });

    //working as componentWillUnmount
    useEffect(() => {
        console.log("useEffect");
        document.title = count;

        //clean up
        return () => {
            alert("Called before component unmounts " + count);
        };
    }, []);

    console.log("render");
    return (
        <div>
            <p>count = {count}</p>
            <button onClick={() => setCount(count + 1)}>count++</button>
        </div>
    );
}

export default CleanUp;
