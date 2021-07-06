import React, { useState, useEffect } from "react";
import firebase from "./firebase";

//demo of login & logout

function Demo() {
    // console.log(firebase);
    const auth = firebase.auth();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            console.log(email + " " + password);
            setLoading(true);
            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res.user);
            setUser(res.user);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
            setTimeout(() => {
                setError("");
            }, 4000);
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setLoading(true);
            let res = await auth.signOut();

            console.log(res);
            setUser(null);
            setEmail("");
            setPassword("");
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
            setTimeout(() => {
                setError("");
            }, 2000);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <h1>Please wait Loading....</h1>
            ) : user === null ? (
                <div>
                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                        />
                    </label>

                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                    </label>

                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    {error ? <h1>{error}</h1> : <></>}
                </div>
            ) : (
                <>
                    <h2>{user.email} is signed in</h2>
                    <button onClick={handleSignOut}>Sign out</button>
                    {error ? <h3>{error}</h3> : <></>}
                </>
            )}
        </>
    );
}

export default Demo;
