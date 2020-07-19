import React, { Component } from 'react';
import AdminAppBar from '../../components/AdminAppBar';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Paper, Grid, Typography } from '@material-ui/core';
import {UPDATE_ORDERS, ERROR_MESSAGES, EMPTY_ERRORS} from '../../reducers/actions';
import AuthService from '../../utils/AuthService';
import { Alert } from '@material-ui/lab';

const styles = themes => ({
    appBar: {
        margin: 0
    },
    paper: {
        marginTop: 120,
        width: 500,
        marginLeft: 400,
        padding: 10,
        cursor: "pointer"
    },
    heading: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#009973"
    },
    grid: {
        border: "1px solid #eee",
        cursor: "pointer"
    },
    typo: {
        color: "#009973",
        fontWeight: "bold"
    }
})

class AdminDashboard extends Component 
{
    componentWillMount() 
    {
        this.props.dispatch({type: EMPTY_ERRORS});
        const auth = new AuthService();

        /**
         *      If the user is authenticated, update the pending orders else redirect him to the login page
         */
        if(auth.isAuthenticated())
        {
            axios.get('http://localhost:5004/orders')
            .then(response => {
                this.props.dispatch({type: UPDATE_ORDERS, payload: {orders: [...response.data]}});
            })
        }
        else
        {
            this.props.history.push("/admin/login");
        }
        
    }

    clickHandler = (id, event) => {

        /**
         *     Check onto to the server if there is any Rider available for the pending order. If yes then create a window alert of 
         *     "Delivery Approved" otherwise create a window alert of "No Riders Available"
         */
        axios.post('http://localhost:5004/approveOrder', {
            id
        })
        .then(response => {
            if(response.data.order_id){
                window.alert("Delivery Approved !!");
            }
            else{
                window.alert("No Riders Available !!");
            }
        })
    }

    render() { 
        const {classes, pendingOrders} = this.props;
        
        return ( 
            <div>
                <AdminAppBar className={classes.appBar} />
                <Paper className={classes.paper}>
                    <Typography className={classes.heading} align="center">Delivery Requests</Typography>
                    <hr/>
                    <br/>
                    <Grid container xs>
                        <Grid align="center" item xs><Typography className={classes.typo}>Order ID</Typography></Grid>
                        <Grid item xs><Typography className={classes.typo}>Date</Typography></Grid>
                        <Grid item xs><Typography className={classes.typo}>Status</Typography></Grid>
                    </Grid>
                    <hr/>
                        {
                            pendingOrders.length > 0 ? pendingOrders.map((order, index) => (
                                <React.Fragment className={classes.grid}>
                                    <Grid container xs onClick={() => this.clickHandler(order.order_id)}>
                                        <Grid align="center" item xs>{order.order_id}</Grid>
                                        <Grid item xs>{order.date}</Grid>
                                        <Grid item xs>{order.status}</Grid>
                                    </Grid>
                                    <hr/>
                                </React.Fragment>
                            ))
                            :
                            null
                        }
                </Paper>
            </div>
         );
    }
}

const mapStateToProps = state => {
    const {pendingOrders} = state;
    return {pendingOrders};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(AdminDashboard);