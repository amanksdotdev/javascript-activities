import React, { useState } from "react";

function UseStateExample1() {
    const [msgObj, setMsgObj] = useState({ message: "", length: 0 });

    const handleChange = (e) => {
        let msg = e.target.value;
        let length = msg.length;

        // WRONG!!!! CHANGES THE STATE BUT DOES NOT RENDER
        // msgObj.length = length;
        // msgObj.msg = msg;
        // setMsgObj(msgObj);

        //CORRECT!! create new object which changes the address and then react knows that state is changed so it re-renders
        setMsgObj({ ...msgObj, message: msg, length: length });
    };
    return (
        <div>
            <input type="text" value={msgObj.message} onChange={handleChange} />
            <p>
                message: {msgObj.message} <br /> length: {msgObj.length}
            </p>
        </div>
    );
}

export default UseStateExample1;
