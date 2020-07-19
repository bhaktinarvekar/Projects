import React, { Component } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux';
import {compose} from 'redux';
import CustomAppBar from '../components/CustomAppBar';
import {cardTypes} from '../store/menulist';
import axios from 'axios';
import AuthService from '../utils/AuthService';

const styles = themes => ({
    paper: {
        marginTop: 100,
        width: 600,
        marginLeft: 400,
        padding: 20
    },
    typo: {
        fontSize: 30,
        marginLeft: 200,
        padding: 10,
        color: "#009973",
        fontWeight: "bold"
    },
    label: {
        color: "grey"
    },
    inputText: {
        marginLeft: 20,
        border: "1px solid grey",
        borderRadius: 5,

    },
    btn: {
        marginLeft: 20,
        width: 200,
        padding: 5,
        backgroundColor: "#009973",
        color: "white",
        border: "1px solid #009973",
        borderRadius: 5
    }
})

class Payment extends Component 
{
    componentWillMount() {
        const auth = new AuthService();

        //  Load the payment page only if the token 
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }
    }

    submitHandler = event => 
    {
        const auth = new AuthService();
        
        var date = new Date();
        let dateTemp = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(parseInt(date.getDate()) + parseInt(this.props.delivery.date) + 1);
        
        /**
         *      After the payment is done, enter the order details into the database.
         *      Fetch the orderID from the response and redirect to "Order" page
         */
        axios.post('http://localhost:5004/paymentSubmited', {
            time: this.props.delivery.slot, date: dateTemp
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.getToken()}`
                }
        })
        .then(response => {
            this.setState({orderid: response.data});
            this.props.history.push(`/order/${response.data}`, {date: dateTemp});
        })
        .then(response => {
            const {cartItems} = this.props;

            /**
             *      Make the entry of all the items in the cart into the database to keep a track of all the items 
             *      for the given orderID
             */
            axios.post('http://localhost:5002/orderHistory', {
                cartItems, order_id: this.state.orderid, email: this.props.user.email,
            })
            .then(response => {
                
            })
        })
        .then(response => {

            /**
             *      Send an email to the user on his emailID and Email contains the order confirmation details
             */
            axios.post('http://localhost:5004/orderConfirmation', {
                user: this.props.user,
                orderID: this.state.orderid
            })
            .then(response => {
            })
        })    
    }

    render() { 
        const {classes} = this.props;
        return ( 
            <div>
                <CustomAppBar />
                <Paper className={classes.paper} >
                    <Typography className={classes.typo}>Payment</Typography>
                    <hr/>
                    <br/>
                    <div>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                                <Typography className={classes.label}>Card Holder Name</Typography>
                            </Grid>
                            <Grid item xs={8} align="left" direction="row">
                                <input className={classes.inputText} type="text" style={{width: 300}} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                                <Typography className={classes.label}>Card Type</Typography>
                            </Grid>
                            <Grid item xs={8} align="left" direction="row">
                                <select className={classes.inputText} style={{width: 300}} >
                                    <option value=""></option>
                                {
                                    cardTypes.map(type => (
                                        <option value={type}>{type}</option>
                                    ))
                                }
                                </select>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                                <Typography className={classes.label}>Card Number</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                                <input className={classes.inputText} type="text" style={{width: 300}} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                                <Typography className={classes.label}>Expiry Date</Typography>
                            </Grid>
                            <Grid item xs={8} align="left" direction="row">
                                <input className={classes.inputText} type="text" style={{width: 30}} />
                                <span> / </span>
                                <input className={classes.inputText} type="text" style={{width: 30, marginLeft: 0}} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                                <Typography className={classes.label}>CCV</Typography>
                            </Grid>
                            <Grid item xs={8} align="left" direction="row">
                                <input className={classes.inputText} type="text" style={{width: 50}} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs={12}>
                            <Grid item xs={4} align="right">
                            </Grid>
                            <Grid item xs={8} align="left" direction="row">
                                <button className={classes.btn} onClick={this.submitHandler}>Proceed to Payment</button>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(Payment);