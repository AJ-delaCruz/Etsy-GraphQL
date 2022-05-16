import React, {Component} from "react";
import '../../App.css';
import axios from 'axios';
import cookie from "react-cookies";
import {Navigate} from "react-router";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            authFlag: false,
            errorMsg: null,
        };

        this.submitSignup = this.submitSignup.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);

    }


    //username change handler
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitSignup(e) {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            // firstName: this.state.firstName,
            // LastName: this.state.LastName,
            // street: this.state.street,
            // city: this.state.city,
            // state: this.state.state,
            // country: this.state.country,
            // zipcode: this.state.zipcode,
            username: this.state.username,
            // phoneNum: this.state.phoneNum,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                //set invalid message
                this.setState({
                    errorMsg: "Invalid."
                });
            });

    }

    render() {
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Navigate to="/profile"/>
        }


        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="singup-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Sign up</h2>
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.usernameChangeHandler}
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="username"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.passwordChangeHandler}
                                    type="Password"
                                    className="form-control"
                                    // name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button onClick={this.submitSignup} className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;