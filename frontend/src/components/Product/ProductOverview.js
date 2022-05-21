import React, {useEffect, useState} from 'react';
import Navbar from "../LandingPage/Navbar";
import {Button} from "react-bootstrap";
import Footer from "../Footer/Footer";
import {useLocation} from "react-router";
import { useDispatch } from "react-redux";
import { addProduct} from "../../modernRedux/cartRedux";
// import {Button} from "@mui/material";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_PRODUCT_OVERVIEW, GET_SHOP} from "../../GraphQL/Queries";
import {Link, useParams} from "react-router-dom";

const ProductOverview = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { productId } = useParams();
    console.log("PRODUCTID = "+productId);
    console.log("Products =  "+product);
    console.log(product);


    const [fetchProduct, { data, loading }] = useLazyQuery(GET_PRODUCT_OVERVIEW);

    useEffect(() => {
        fetchProduct({ variables: { id: productId } });
    }, [productId]);

    useEffect(() => {
        if (data) {
            setProduct(data.getSingleProduct);
        }
    }, [data]);

    const handleQuantity = (type) => {
        if (type === "decrease") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };


    //redux
    const handleClick = () => {
        dispatch(
            addProduct({ ... product, quantity })
        );
    };



    return (
        <div style={{marginBottom: "500px"}}>
            {<Navbar/>}


            <div>
                <div className="topContainer"
                     style={{
                         display: "flex",
                         textAlign: "center",
                         justifyContent: "space-between",
                         padding: "20px"
                     }}>

                    <Button style={{
                        fontWeight: "600",
                        padding: "10px",
                    }}>Continue Shopping</Button>


                    <Link to={"/checkout"}>
                    <Button style={{
                        fontWeight: "600",
                        padding: "10px",
                    }}>Checkout</Button>
                    </Link>
                < /div>


                <div className="bottomContainer"
                     style={{
                         display: "flex",
                         justifyContent: "space-between",
                         // padding:"20px"
                         margin: "20px"
                     }}>

                    <div className="productDetail" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: "1.5"
                    }}>
                        <img style={{
                            width: "400px"
                        }}

                             src={product.img}/>

                    </div>


                    <div className="orderSummary"
                         style={{
                             border: "0.5px solid lightgray",
                             borderRadius: "20px",
                             flexDirection: "column",
                             flex: "1",
                             // height:"90%"
                             height: "80vh",
                             padding: "50px",
                         }}>
                        <h5 style={{display: "flex", fontWeight: "150", justifyContent: "left"}}>{product.shopName}</h5>
                        <div className="productDescription" style={{
                            display: "flex",
                            // alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: "column",
                            // padding: "20px"
                            // flex: "1"
                            // padding: "20px",
                            marginBottom: "30px"
                        }}>

                            <div>
                                {product.sale > 1 ? product.sale + " sales " : product.sale + " sale "}
                            </div>

                        </div>

                        <div className="productDescription" style={{
                            display: "flex",
                            // alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: "column",
                            // padding: "20px"
                            // flex: "1"
                            // padding: "20px",
                            marginBottom: "100px",
                            fontSize: "25px"
                        }}>
                            <div className="productName">
                                <b>Product: </b>
                                {product.title}

                            </div>


                            <div className="productDesc" style={{}}>
                                <b>Description:</b>
                                {product.description}

                            </div>

                        </div>


                        <div className="priceContainer"
                             style={{
                                 display: "flex",
                                 alignItems: "center",
                                 // marginBottom: "10px"
                                 // justifyContent: "space-between"
                             }}>
                            <Button onClick={() => handleQuantity("decrease")}>
                                -
                            </Button>
                            <span style={{margin: "10px"}}>
                                {quantity}
                            </span>
                            <Button onClick={() => handleQuantity("increase")}>
                                +
                            </Button>
                        </div>


                        <div className="productSummary"
                             style={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 margin: "30px 0px"
                             }}>
                            <h5 style={{
                                marginLeft: "20px"
                            }}>$ {product.price}</h5>
                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}


                        </div>


                        <hr
                            style={{
                                backgroundColor: "black",
                                height: "1px",
                                // margin: "100px",
                                // border:"none"
                            }}
                        />


                        <div
                            style={{
                                display: "flex", flexDirection: "column",
                                justifyContent: "center",
                                // backgroundColor:"black",
                                alignItems: "center"
                            }}>

                            <Button onClick={handleClick} style={{
                                width: "50%",
                                padding: "10px",
                                margin: "10px"

                            }}>
                                ADD TO CART
                            </Button>
                        </div>

                    </div>
                    {/*Summary*/}
                </div>
                {/*bottom container*/}

            </div >
            {/*{< Footer/>}*/}
        </div>
    )
}


export default ProductOverview;