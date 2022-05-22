import {useEffect, useState} from "react";
import {popularProducts} from "./data";
import Product from "./Product";

import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "../../GraphQL/Queries";
import {useParams} from "react-router-dom";


const Products = ({categories, filters, sort, searchValue}) => {
    // const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState([]);
    const {productId} = useParams();

    // const userId = localStorage.getItem("user_id");
    // const [fetchProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCTS);
    // const [fetchProduct, { data }] = useLazyQuery(GET_ALL_PRODUCTS);
    //
    // useEffect(() => {
    //     if (data) {
    //         setAllProducts(data);
    //     }
    // }, [data]);


    const {loading, error, data} = useQuery(GET_ALL_PRODUCTS);
    // console.log(data.getAllProducts[0]);
    if (loading) return null;
    if (error) return `Error! ${error}`;
    // console.log(data.getAllProducts.map(x => x.id))



    // useEffect(() => {
    //     if (data) {
    //         setAllProducts(data.getAllProducts);
    //     }
    // }, [data]);
    // if (loading) return null;
    // if (error) return `Error! ${error}`;
    //
    // useEffect(() => {
    //     fetchProducts({
    //         variables: { categories: categories, filters: filters,  sortBy: sort, filterBySearch: searchValue },
    //     });
    // }, [categories, filters, sort, searchValue]);
    //
    // useEffect(() => {
    //     if (data) {
    //     setProducts(data.getProducts);
    //     }
    // }, [data]);

    //
    // useEffect(() => {
    //     setFilteredProducts(
    //         products.filter((item) =>
    //             Object.entries(filters).every(([key, value]) =>
    //                 item[key].includes(value)
    //             )
    //         )
    //     );
    // }, [searchValue, products, categories, filters]);
    //
    // //SORT
    // useEffect(() => {
    //     // if (sort === "newest") {
    //     //     setFilteredProducts((prev) =>
    //     //         [...prev].sort((a, b) => a.createdAt - b.createdAt)
    //     //     );
    //     // } else
    //     if (sort === "asc") {
    //         setFilteredProducts((prev) =>
    //             [...prev].sort((a, b) => a.price - b.price)
    //         );
    //     } else {
    //         setFilteredProducts((prev) =>
    //             [...prev].sort((a, b) => b.price - a.price)
    //         );
    //     }
    // }, [sort]);

    return (

        <div style={{
            marginTop:"-200px",
            padding: "200px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"

        }}
        >
            {/*{filteredProducts //return filtered products*/}
            {/*    ? filteredProducts.map((item) => <Product item={item} key={item.id}/>)*/}
            {/*    //else return all products*/}
            {/*    : products.map((item) => <Product item={item} key={item.id}/>)}*/}
            {/*{data.getAllProducts.map((item) => <Product item={item} key={item._id}/>)}*/}

            {data.getAllProducts.map((item) => <Product item={item} key={item.id}/>)}

        </div>
    );
};

export default Products;
