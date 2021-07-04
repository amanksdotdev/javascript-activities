import React, { useContext } from "react";
import { NameContext, AgeContext } from "./ProviderComponent";

function Test2() {
    const name = useContext(NameContext);
    const age = useContext(AgeContext);

    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}
export default Test2;