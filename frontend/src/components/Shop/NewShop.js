import React from 'react';
import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_SHOP_MUTATION} from "../../GraphQL/Mutations";
import {Navigate} from "react-router";
import {GET_SHOP} from "../../GraphQL/Queries";

const NewShop = () => {

    const userId = localStorage.getItem("user_id");
    const [shopName, setShop] = useState("");
    console.log(shopName)
    // const [add, {error}] = useMutation(CREATE_SHOP_MUTATION);

    //createShop needs to match gql mutation
    const [createShop, {loading}] = useMutation(CREATE_SHOP_MUTATION);
    let redirectVar = null;
    const addShop = () => {
        createShop({
            variables: {
                userId: userId,
                shopName: shopName,
            },
            update: (_, {data}) => {
                console.log("creating shop")
                console.log(data);

            },
        });
        redirectVar = <Navigate to= "/shop"/>

    };


    return (
        <div>
            {redirectVar}
            <div className="container" style={{


                height: "300px",
                alignItems: 'center',
                justifyContent: "center",
                display: 'flex',
                backgroundColor: "#f5fbfd",
                flexDirection: "column",
                marginTop: "50px"

            }}>
                <h1>
                    Name your shop
                </h1>


                <span>Choose a memorable name that reflects your style</span>

                <form onSubmit={addShop}>
                    <div style={{display: 'flex', flexDirection: "row", marginTop: "50px",}}>

                        <div style={{display: 'flex', position: "relative"}}>
                            <input
                                style={{width: "800px", height: "140%"}}
                                // onChange={this.searchHandler}
                                className="form-control"
                                placeholder="Shop Name"
                                name="shopName"
                                onChange={(e) => {
                                    setShop(e.target.value);
                                }}
                            />


                            {/*{this.state.hasShop === false ?*/}
                            <div style={{

                                position: "absolute",
                                bottom: "0",
                                right: "10px",
                                top: "0",
                                margin: "10px"

                            }}>
                                {/*<button*/}
                                {/*    style={{*/}
                                {/*        display: 'flex',*/}
                                {/*        // justifyContent: "center",*/}
                                {/*        alignItems: 'center',*/}
                                {/*        backgroundColor: "lightgreen",*/}
                                {/*        // marginRight:"10px"*/}
                                {/*        // position:"abslute",*/}
                                {/*        // height: "100%",*/}
                                {/*        opacity: "1",*/}
                                {/*        borderRadius: "100px"*/}
                                {/*    }}>*/}

                                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                                {/*         fill="currentColor"*/}
                                {/*         className="bi bi-check-lg" viewBox="0 0 16 16"*/}
                                {/*         style={{marginRight: "5px"}}*/}
                                {/*    >*/}
                                {/*        <path*/}
                                {/*            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>*/}
                                {/*    </svg>*/}
                                {/*    /!*Available*!/*/}
                                {/*</button>*/}
                            </div>


                            {/*:*/}
                            {/*this.state.hasShop === true ?*/}

                            <div style={{

                                position: "absolute",
                                bottom: "0",
                                right: "10px",
                                top: "0",
                                margin: "10px"

                            }}>
                                {/*<button*/}
                                {/*    style={{*/}
                                {/*        display: 'flex',*/}
                                {/*        // justifyContent: "center",*/}
                                {/*        alignItems: 'center',*/}
                                {/*        backgroundColor: "red",*/}
                                {/*        opacity: "1",*/}
                                {/*        borderRadius: "100px",*/}
                                {/*        // marginRight:"5px"*/}
                                {/*    }}>*/}

                                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"*/}
                                {/*         fill="currentColor"*/}
                                {/*         className="bi bi-x-lg" viewBox="0 0 16 16"*/}
                                {/*         style={{marginRight: "5px"}}>*/}
                                {/*        <path fill-rule="evenodd"*/}
                                {/*              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>*/}
                                {/*        <path fill-rule="evenodd"*/}
                                {/*              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>*/}
                                {/*    </svg>*/}
                                {/*    /!*Not Available*!/*/}
                                {/*</button>*/}
                            </div>
                            {/*: null}*/}


                        </div>


                        <div>
                            <button style={{width: "100%", height: "140%"}} onClick={addShop}
                                    className="btn btn-primary">
                                Check Availability
                            </button>
                        </div>

                    </div>

                    <div style={{marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {/*{this.state.hasShop === false || null ? this.state.errorMsg : null}*/}
                        <button style={{marginTop: "10px", width: "20%"}} onClick={addShop}
                                className="btn btn-primary">

                            Submit
                        </button>


                    </div>
                </form>

            </div>
        </div>
    )

}

export default NewShop;