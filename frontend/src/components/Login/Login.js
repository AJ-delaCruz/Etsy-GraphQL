import React, { useState } from "react";
import { LOGIN_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import jwt_decode from 'jwt-decode';
import styled from "styled-components";
import {Button} from "@mui/material";

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
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
                    <Input placeholder="username" type = "text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>

                    <Input placeholder="password" type = "password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>

                    <Button style={{
                        width: "50%",
                        border: "none",
                        padding: "15px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        margin: "10px",
                    }}
                            onClick={login}>
                        Log In
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: #f5fbfd;;
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
display: flex;
align-items: center;
justify-content: center;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
flex: 1;
width: 500px;
margin: 20px 10px 0px 0px;
padding: 10px;
text-align: center
`;






export default Login;
