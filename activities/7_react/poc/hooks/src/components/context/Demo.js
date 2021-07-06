import React from "react";
import DemoChild from "./DemoChild";

function Demo() {
    console.log("render Demo");
    return (
        <div>
            <DemoChild />
        </div>
    );
}

export default React.memo(Demo);

//React.memo() to skip rendering of Demo when it's parent Main state changes
