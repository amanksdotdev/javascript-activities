import React, { useState } from "react";
import Demo from "./Demo";

import MyContext from "./Context";

function Main() {
    console.log("render Main");
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>click</button>
            <MyContext.Provider value={count}>
                <Demo />
            </MyContext.Provider>
        </div>
    );
}

export default Main;
