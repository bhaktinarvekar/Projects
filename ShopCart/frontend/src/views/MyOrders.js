import React, { Component } from 'react';
import CustomAppBar from '../components/CustomAppBar';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import axios from 'axios';
import { profiles } from '../store/images';
import {LOAD_ORDERS, RELATED_ITEMS, ADD_TO_CART, FETCH_ITEM} from '../reducers/actions';
import SearchResults from './SearchResults';
import AuthService from '../utils/AuthService';

const styles = theme => ({
    div: {
        marginTop: 200
    },
    img: {
        width: 100,
        height: 100
    },
    orderTitle: {
        backgroundColor: "#009973",
        padding: 10,
        color: "white",
        boxShadow: "10px 10px 5px #aaaaaa",
        fontFamily: "Sacramento",
        fontWeight: "bold"
    },
    card: {
        width: "70%",
        height: "auto",
        marginBottom: 60
    },
    btn: {
        padding: 7,
        width: 150,
        height: 40,
        marginRight: 10,
        borderRadius: 5,
        border: "1px solid #009973",
        backgroundColor: "#009973",
        color: "white",
        marginTop: 10,
        fontFamily: "Sacramento",
        fontWeight: "bold"
    },
    typo: {
        fontFamily: "Sacramento",
        fontSize: 16,
        color: "black"
    },
    typohead: {
        fontFamily: "Sacramento",
        fontSize: 18,
        fontWeight: "bold",
        color: "#009973"
    }
})

class MyOrders extends Component 
{
    componentWillMount() 
    {
        const auth = new AuthService();

        /**
         *      If the user is not authenticated, redirect to the "Login" page otherwise get all the previous orders
         *      for the user from the database
         */
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }

        axios.post('http://localhost:5002/getOrderHistory', {
            email: this.props.user.email
        })
        .then(response => {
            this.props.dispatch({type: LOAD_ORDERS, payload: {my_orders: response.data}});
        });
    }

    onViewHandler = (item, event) => {
        //Update the related items so that the current item is not present in the related items list
        this.props.dispatch({type: RELATED_ITEMS, payload: {id: item.id}});
        this.props.history.push(`/viewitems/${item.category}/${item.id}`)
    }

    onAddHandler = (item, event) => {
        //Update the item into the item object with quantity = 1 and add the item into the cart
        this.props.dispatch({type: FETCH_ITEM, payload: {item: {...item, quantity: 1}}})
        this.props.dispatch({type: ADD_TO_CART})
    }

    render() 
    { 
        const {classes, orders, orders_title, searched, searchedItems} = this.props;
        return ( 
            <React.Fragment>
                <CustomAppBar />
                {
                    searched && searchedItems.length > 0 ?
                    <SearchResults />
                    :
                    <div className={classes.div} align="center">
                        <React.Fragment>
                            {
                                orders_title.length > 0 ? 
                                orders_title.map((order, index) => (
                                    <Paper elevation={5} className={classes.card}>
                                            <div className={classes.orderTitle}>
                                                <Grid container xs={12}>
                                                    <Grid item xs>Order Placed</Grid>
                                                    <Grid item xs>Total items</Grid>
                                                    <Grid item xs>Total Cost</Grid>
                                                </Grid>
                                                <Grid container xs={12}>
                                                    <Grid item xs>{order.date}</Grid>
                                                    <Grid item xs>{order.items}</Grid>
                                                    <Grid item xs>${order.price}</Grid>
                                                </Grid>
                                            </div>
                                            <br/>
                                            <Grid container xs={12} spacing={5}>
                                                {orders[index].map((elem, i) => (
                                                    <React.Fragment>
                                                        <Grid item xs={3}>
                                                            <img src={profiles[elem.path]} className={classes.img}/>
                                                        </Grid>
                                                        <Grid item xs={9} align="left">
                                                            <Grid item><Typography className={classes.typohead}>{elem.itemName}</Typography></Grid>
                                                            <Grid item><Typography className={classes.typo}>${elem.price}</Typography></Grid>
                                                            <Grid item><Typography className={classes.typo}>Quantity: {elem.quantity}</Typography></Grid>
                                                            <button className={classes.btn} onClick={() => this.onViewHandler(elem)}>View item</button>
                                                            <button className={classes.btn} onClick={() => this.onAddHandler(elem)}>Add to Cart</button>
                                                        </Grid>
                                                    </React.Fragment>
                                                ))}
                                            </Grid>
                                    </Paper>
                                )) : null
                            }
                        </React.Fragment>
                </div>
            }
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(MyOrders);