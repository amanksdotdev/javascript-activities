import React, { useState, useEffect } from "react";

//Note -> useEffect are run after render

// useEffect has 3 variations
//1. useEffect(()=>{})  // runs after every render
//2. useEffect(()=>{},[])   // runs only at first render
//3. useEffect(()=>{},[count])  //runs only when count state is changed

//Cleanup using useEffect
//  useEffect(()=>{ return ()=>{}})  // runs the returned function before next useEffect

function UseEffectExample1() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");

    //1: with no dependency array
    useEffect(() => {
        console.log("useEffect 1 : runs after every render");
    });

    //2: with empty dependency array
    useEffect(() => {
        console.log("useEffect 2: runs at first render");
    }, []);

    //3: with dependency array
    useEffect(() => {
        console.log("useEffect 3: runs only when count is changes");
    }, [count]);

    console.log("rendered");
    return (
        <div>
            <h2>Type to update message</h2>
            <p>Message: {message}</p>
            <input
                type="text"
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                value={message}
            />
            

            <h2>Click to update count</h2>
            <h3>count: {count}</h3>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </div>
    );
}

export default UseEffectExample1;
