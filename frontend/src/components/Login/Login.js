import React, { useState } from "react";
import { LOGIN_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //post
    const [loginUser, { error }] = useMutation(LOGIN_USER_MUTATION);

    //button to register
    const login = () => {
       loginUser({
            variables: {username: username, password: password},
            update: (_, { data }) => {
                console.log("loggin in")
                console.log(data);
                // notify(`Welcome, ${data.login.username}! You're logged in.`);
                // reset();
                // closeModal();
            },
        });

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
            <button onClick={login}> Login</button>
        </div>
    );
}

export default Login;
