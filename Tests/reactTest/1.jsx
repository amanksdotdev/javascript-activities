import React, { useState } from "react";

function Profile() {
    const [name, setName] = useState("Backbencher");
    const [age, setAge] = useState(23);

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onAgeChange = (e) => {
        setAge(e.target.value);
    };
    
    return (
        <div>
            <form>
                <input type="text" value={name} onChange={onNameChange} />
                <input type="text" value={age} onChange={onAgeChange} />
                <h2>
                    Name: {name}, Age: {age}
                </h2>
            </form>
        </div>
    );
}

export default Profile;
