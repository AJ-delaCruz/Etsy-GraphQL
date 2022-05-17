import React, { useState } from "react";
import { LOGIN_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import jwt_decode from 'jwt-decode';

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
                console.log("logging in")
                console.log(data.login);


                //auth
                const token = data.login.token
                console.log(token)
                const decoded = jwt_decode(token);
                console.log("decoded " + decoded);
                console.log(decoded);
                console.log(decoded.id);
                console.log(decoded.username);

                localStorage.setItem("token", token);
                localStorage.setItem("user_id", decoded.id);
                localStorage.setItem("username", decoded.username);

                console.log(localStorage.getItem("username"));
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
