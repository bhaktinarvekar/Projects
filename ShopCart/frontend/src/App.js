import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import RegisterSuccess from './views/RegisterSuccess';
import Login from './views/Login';
import Registration from './views/Registration';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import Dashboard from './views/Dashboard';
import ViewItems from './views/ViewItems';
import Items from './views/Items';
import AdminLogin from './views/admin/AdminLogin';
import AdminRegistration from './views/admin/AdminRegisteration';
import AddProducts from './views/admin/AddProducts';
import AddNewCategory from './views/admin/AddNewCategory';
import AdminDashboard from './views/admin/AdminDashboard';
import Checkout from './views/Checkout';
import Payment from './views/Payment';
import Order from './views/Order';
import MyOrders from './views/MyOrders';
import SocialLogin from './views/SocialLogin';
import MyProfile from './views/MyProfile';
import OTP from './views/OTP';
import AdminRegisteSuccess from './views/admin/RegisterSuccess';
import RiderReviews from './views/RiderReviews';


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
        <Route path ="/handleLogin" exact component={SocialLogin} />
        <Route path="/register" exact component={Registration}/>
        <Route path="/reset_password" exact component={ResetPassword} />
        <Route path="/handle_registeration" exact component={RegisterSuccess} />
        <Route path="/admin/handle_registeration" exact component={AdminRegisteSuccess} />
        <Route path="/forgot_password" exact component={ForgotPassword}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/viewitems/:category" exact component={ViewItems} />
        <Route path="/viewitems/:category/:id" exact component={Items} />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Route path="/admin/register" exact component={AdminRegistration} />
        <Route path="/admin/addProduct" exact component={AddProducts} />
        <Route path="/admin/addNewCategory" exact component={AddNewCategory} />
        <Route path="/admin/dashboard" exact component={AdminDashboard} />
        <Route path="/checkout" exact component={Checkout}/>
        <Route path="/payment" exact component={Payment} />
        <Route path="/order/:id" exact component={Order} />
        <Route path="/myorders" exact component={MyOrders} />
        <Route path="/myprofile" exact component={MyProfile} />
        <Route path="/requestOTP" exact component={OTP} />
        <Route path="/rider/:id" exact component={RiderReviews} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
