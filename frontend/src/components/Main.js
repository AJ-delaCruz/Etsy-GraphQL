import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Homepage/Home';
import Navbar from './LandingPage/Navbar';
import Signup from "./Signup/Signup";
import Checkout from './Checkout/Checkout';
import Profile from './Profile/Profile';
import UpdateProfile from "./Profile/UpdateProfile";
// import Favorite from "./Favorites/Favorite";
import Category from "./Product/Category";
import ProductList from "./Product/ProductList";
import Seller from "./Shop/Seller";
import ShopHomePage from "./Shop/ShopHomePage";
import NewShop from "./Shop/NewShop";

// import UpdateShop from "./Shop/UpdateShop";
// import Cart from "./Checkout/Cart";
// import EditShopProduct from "./Shop/EditShopProduct";
// import EditShopOwner from "./Shop/EditShopOwner";
import ProductOverview from "./Product/ProductOverview";
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}

                <Routes>
                    <Route path="/" element={<Navbar/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/profileUpdate" element={<UpdateProfile/>}/>
                    <Route path="/newShop" element={<NewShop/>}/>
                    <Route path="/shop" element={<ShopHomePage/>}/>
                    <Route path="/seller" element={<Seller/>}/>
                    <Route path="/productlist" element={<ProductList/>}/>
                    <Route path="/productOverview/:productId" element={<ProductOverview/>}/>
                    <Route path="/category" element={<Category/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>

                    {/*<Route path="/favorites" element={<Favorite/>}/>*/}

                    {/*<Route path="/shop" element={<ShopHomePage/>}/>*/}

                    {/*<Route path="/updateShop" element={<UpdateShop/>}/>*/}
                    {/*<Route path="/editShopProduct" element={<EditShopProduct/>}/>*/}
                    {/*<Route path="/editShop" element={<EditShopOwner/>}/>*/}
                    {/*<Route path="/cart" element={<Cart/>}/>*/}

                    {/*<Route path="/test" element={<Parent/>}/>*/}


                </Routes>



            </div>
        )
    }
}
//Export The Main Component
export default Main;