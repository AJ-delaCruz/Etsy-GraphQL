import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //post
    const [register, { error }] = useMutation(CREATE_USER_MUTATION);

    //button to register
    const addUser = () => {
        register({
            variables: {
                username: username,
                password: password,
            },
        });

        if (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={addUser}> Register</button>
        </div>
    );
}

export default Signup;
