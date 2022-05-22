import React, {useState} from "react";
import {CREATE_USER_MUTATION} from "../../GraphQL/Mutations";
import {useMutation} from "@apollo/client";
import styled from "styled-components";
import {Navigate} from "react-router";
import {useHistory, Redirect} from "react-router-dom";
import {Button} from "@mui/material";
function Signup() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //post
    const [register, {error}] = useMutation(CREATE_USER_MUTATION);

    //button to register
    const addUser = () => {
        register({
            variables: {
                name: name,
                username: username,
                password: password,
            },

        });
        // history.push("/");
        // window.location.href ="/login";
        if (error) {
            console.log(error);
        } else window.location.href ="/login";
    };

    // let redirectVar = null;
    // if (this.state.authFlag) {
    //     redirectVar =  <Navigate to="/home"/>
    //
    // }
    return (

        <Container>
            {/*{ redirectVar}*/}
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>

                    <Input placeholder="Name" onChange={(e) => {
                        setName(e.target.value);
                    }}/>


                    <Input placeholder="username" onChange={(e) => {
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
                            onClick={addUser}>
                        Register
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
width: 100vw;
height: 50vh;
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





export default Signup;

