import React, { useEffect } from "react";

//clean up exmaple
function HookExample() {
    useEffect(() => {
        window.addEventListener("mousemove", handleMousePosition);
        return () => {
            window.removeEventListener("mousemove", handleMousePosition);
        };
    }, []);

    return <div></div>;
}

export default HookExample;
