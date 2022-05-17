import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //post
    const [submitSignup, { error }] = useMutation(CREATE_USER_MUTATION);

    //button to register
    const addUser = () => {
        submitSignup({
            variables: {
                email: email,
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
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
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
