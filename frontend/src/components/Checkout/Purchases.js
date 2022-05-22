import React, {useEffect} from 'react';
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ORDER_PRODUCTS} from "../../GraphQL/Queries";
import {useState} from "react";
import Product from "../Product/Product";
import Navbar from "../LandingPage/Navbar";


const Purchases = () => {

    const userId = localStorage.getItem("user_id");
    // const [orders, setOrders] = useState({});

    // const [fetchOrder, { data, loading }] = useLazyQuery(GET_ORDER_PRODUCTS);


    const {loading, error, data} = useQuery(GET_ORDER_PRODUCTS, {
        variables: {userId: userId},
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log(data);

    // useEffect(() => {
    //     fetchOrder({ variables: { userId: userId } });
    // }, [userId]);
    //
    // useEffect(() => {
    //     if (data) {
    //         setOrders(data.getOrder);
    //     }
    // }, [data]);


    // {data.getAllProducts.map((item) => <Product item={item} key={item.id}/>)}

    // console.log(data.getOrder.map((x) => x.id));
    // console.log(data.getOrder.map((x) => x.id));
    return (

        <div>
            <Navbar/>
            <div style={{padding: "300px", marginTop: "-250px"}}>
                <h3>Order ID: {data.getOrder[0].id}</h3>

                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        {/*<th>ID</th>*/}
                        <th>DATE</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>


                    </tr>
                    </thead>
                    <tbody>
                    {data.getOrder.map((order) => (
                        <tr key={order.id}>
                            <img style={{
                                width: "200p", height: "200px"
                            }} src={order.img}/>
                            {/*<td>{order.id}</td>*/}
                            <td>{Date(order.createdAt).substring(0, 15)}</td>
                            <td>{order.title}</td>
                            <td>$ {order.price.toFixed(2)}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Purchases;