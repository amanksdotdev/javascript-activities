import React, { useContext } from "react";
import MyContext from "./Context";

function DemoChild() {
    console.log("render demo child");
    const text = useContext(MyContext);
    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
}

export default DemoChild;
