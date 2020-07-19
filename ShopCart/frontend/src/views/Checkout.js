import React, { Component } from 'react';
import CustomAppBar from '../components/CustomAppBar';
import { Typography, Paper, TableHead, TableContainer, Table, TableBody, TableRow, TableCell, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {profiles} from '../store/images';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import {UPDATE_DELIVERY_DATE, ERROR_MESSAGES, UPDATE_DATE_TIME, EMPTY_ERRORS} from '../reducers/actions';
import {timings} from '../store/menulist';
import AuthService from '../utils/AuthService';
import { Alert } from '@material-ui/lab';

const styles = themes => ({
    paper: {
        marginTop: 80,
        width: 600,
        height: "auto",
        padding: 20,
        marginLeft: 400
    },
    img: {
        width: 80,
        height: 80
    },
    item: {
        width: 500,
        marginLeft: 30,
        padding: 30
    },
    btn: {
        marginLeft: 500
    },
    heading: {
        fontSize: 24,
        color: "#009973",
        fontWeight: "bold",
        padding: 10,
        paddingBottom: 20
    },
    typo: {
        fontWeight: "bold",
        color: "#009973"
    },
    deliverybtn: {
        backgroundColor: "#009973",
        color: "white",
        padding: 10,
        border: "1px solid #009973",
        width: 90
    },
    select: {
        width: 300,
        height: 30
    },
    final: {
        color: "#009973",
        fontSize: "20px",
        fontWeight: "bold",
        padding: 20,
    },
    subfinal: {
        color: "grey",
        fontSize: "16px",
        fontWeight: "bold",
        padding: 20,
        marginBottom: -30
    },
})

class Checkout extends Component 
{
    //update the delivery date that is selected by the user
    dateHandler = event => {
        this.props.dispatch({type: UPDATE_DATE_TIME, payload: {name: 'date', value: event.target.value}})
    }

    //update the delivery slot that is selected by the user
    timeHandler = event => {
        this.props.dispatch({type: UPDATE_DATE_TIME, payload: {name: 'slot', value: event.target.value}})
    }

    /**
     *      Display an error if the user has not selected Drop time or date otherwise redirect it to the "payment" page
     */
    checkoutHandler = event => {
        this.props.dispatch({type: EMPTY_ERRORS});

        if(this.props.delivery.slot === 999 || this.props.delivery.date === '')
        {
            if(this.props.delivery.slot === 999)
                this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please select the Drop Time"}});

            if(this.props.delivery.date === '')
                this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please select the Drop Date"}});
        }
        else
        {
            this.props.history.push("/payment", {
                time: this.props.delivery.slot,
                day: this.props.delivery.date
            });
        }
    }

    componentWillMount() {

        const auth = new AuthService();
        
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }

        /**
         *      Retrieve the slots for the next five days and also check if the token is expired/tampered. If the token is 
         *      invalid then redirect to the "Login" page otherwise update the delivery date and time
         */
        axios.get('http://localhost:5004/getNextFive', { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getToken()}`
        }})
        .then(response =>{
            if(response.data === "Invalid token")
                this.props.history.push("/login");
            else{
                const {month, year, day, dates} = response.data;
                this.props.dispatch({type: UPDATE_DELIVERY_DATE, payload: {month: month, year: year, days: day, dates: dates}});
            }
        })
    }

    render() {
        const {classes, cartItems, totalAmount} = this.props;
        const {days, dates, month, year} = this.props;

        //calculate tax, shipping and totalCost 
        let tax = ((18 * totalAmount)/100).toFixed(2);
        let shipping = ((15 * totalAmount)/100).toFixed(2);
        let totalCost = (parseFloat(tax) + parseFloat(shipping) + parseFloat(totalAmount)).toFixed(2);

        return ( 
            <React.Fragment>
                <CustomAppBar />
                <Paper className={classes.paper} align="center">
                    <div>
                        <Typography className={classes.heading} align="center">Confirm your order</Typography> 
                    </div>
                    {this.props.ErrorMessages ? this.props.ErrorMessages.map((message, index) => (
                            <div className="alert alert-danger alert-dismissible fade show">
                                {message}
                            </div>
                    )) : null}
                    <div className={classes.item}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { cartItems.map(items => (
                                        <TableRow>
                                            <TableCell><img className={classes.img} src={profiles[items.path]}/></TableCell>
                                            <TableCell>{items.quantity}</TableCell>
                                            <TableCell>${items.price}</TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Paper >
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={8} className={classes.subfinal} align="right">Subtotal</Grid>
                            <Grid item xs={4} className={classes.subfinal}>${totalAmount}</Grid>
                        </Grid>
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={8} className={classes.subfinal} align="right">Tax</Grid>
                            <Grid item xs={4} className={classes.subfinal}>${tax}</Grid>
                        </Grid>
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={8} className={classes.subfinal} align="right">Shipping</Grid>
                            <Grid item xs={4} className={classes.subfinal}>${shipping}</Grid>
                        </Grid>
                        <hr/>
                        <Grid container xs={12}>
                            <Grid item xs={8} className={classes.final} align="right">Total Cost</Grid>
                            <Grid item xs={4} className={classes.final}>${totalCost}</Grid>
                        </Grid>
                    </Paper>
                    </div>
                    <br/>
                    <Typography className={classes.heading}>Select a delivery date</Typography>
                    <br/>
                    <Grid container spacing={2} justify="space-evenly">
                        { dates ?  dates.map((date, index) => (
                            <Grid items>
                                <button className={classes.deliverybtn} onClick={this.dateHandler} value={index}>{month} {date}<br/>{days[index]}</button>
                            </Grid>
                        )) : null
                        }
                    </Grid>
                    <br/>
                    <Typography className={classes.heading}>Select drop time</Typography>
                    <select className={classes.select} onChange={this.timeHandler}>
                        <option value=""></option>
                        {
                            timings.map((time, index) => (
                                <option value={index}>{time}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <br/>
                    <div align="center" >
                        <CustomButton name="Proceed to Payment" onSubmit={this.checkoutHandler}/>
                    </div>
                </Paper>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    const {cartItems, totalAmount, days, dates, month, year} = state;
    return {cartItems, totalAmount, days, dates, month, year, ...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(Checkout);