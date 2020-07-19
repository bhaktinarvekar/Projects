import React, { Component } from 'react';
import { Typography, Paper, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import CustomAppBar from '../components/CustomAppBar';
import { withStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {profiles} from '../store/images';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { PAYMENT_COMPLETE, UPDATE_USER, UPDATE_ORDER, UPDATE_ORDER_ITEMS, UPDATE_RATINGS, UPDATE_REVIEWS, SUBMIT_RATINGS } from '../reducers/actions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Rating from '@material-ui/lab/Rating';
import CustomButton from '../components/CustomButton';

const styles = themes => ({
    paper: {
        width: 600,
        height: "auto",
        padding: 20,
        marginTop: 150,
        marginLeft: 500
    },
    typo: {
        color: "black",
        fontSize: 14,

    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#009973"
    },
    typo_heading: {
        fontWeight: "bold",
        fontSize: 24,
        color: "black"
    },
    typo_subheading: {
        fontWeight: "bold",
        fontSize: 14,
        color: "black"
    },
    img: {
        height: 100,
        width: 100
    },
    order_title: {
        backgroundColor: "#009973",
        padding: 10,
        color: "white",
        boxShadow: "10px 10px 5px #aaaaaa",
        fontFamily: "Sacramento",
        fontWeight: "bold",
        width: 600,
        height: 70,
        marginLeft: -20,
        marginTop: -20,
        fontSize: 24,
        borderRadius: 5
    },
    section: {
        backgroundColor: "#f2f2f2",
        padding: 20,
        borderRadius: 10
    },
    typo_message: {
        fontWeight: "bold",
        fontSize: 16,
        color: "grey"
    }
})

class Order extends Component 
{
    componentWillMount() {
        //Update the cartItems array to empty and totalItems to 0
        this.props.dispatch({type: PAYMENT_COMPLETE});

        //Set a timeout of 200ms so that redux store could get updated
        setTimeout(() => {
            //Fetch the order details (email address, date) from the database
            axios.post('http://localhost:5002/getOrderDetails', {
            id: this.props.match.params.id
        })
        .then(response => {
            const { email } = response.data;

            //Fetch the User details from the database to display the User informtaion and update it into the redux store
            axios.post('http://localhost:5001/user', { email })
            .then(response => {
                this.props.dispatch({type: UPDATE_USER, payload: {user: response.data}});


                /*
                 *    Get the status of the Order (i.e. whether it is approved by the admin or not) and update the
                 *    order object into the redux store
                 */
                axios.post('http://localhost:5004/getStatus', {
                id: this.props.match.params.id
                })
                .then(response => {
                    this.props.dispatch({type: UPDATE_ORDER, payload: {order: response.data, email}});
                    
                    /*
                     *    Fetch all the items for the given orderID from the database.
                     *    In response, a list of ordered items and total cost of the order will be received.
                     */
                    axios.post('http://localhost:5002/orderedItems', {
                        date: this.props.order.date,
                        id: this.props.match.params.id,
                        email: this.props.user.email
                    })
                    .then(response => {
                        this.props.dispatch({type: UPDATE_ORDER_ITEMS, payload: {response: response.data}});
                    })
                })
            })
        });
        
        /*
         *    Update the reviews and ratings objects if the User has already reviewed the Order/Rider
         *    If the user has already rated/reviewed, then update the readOnly display for ratings and reviews to true else 
         *    update the readOnly display for ratings and reviews to false
         */
        axios.post('http://localhost:5004/getReviews', {
            order_id: this.props.match.params.id, email: this.props.user.email
        })
        .then(response => {
            if(response.data.length !== 0)
            {
                const { order_id, ratings, reviews } = response.data;
                this.props.dispatch({type: UPDATE_RATINGS, payload: {value: ratings, display: true}});
                this.props.dispatch({type: UPDATE_REVIEWS, payload: {message: reviews}});
                this.props.dispatch({type: SUBMIT_RATINGS, payload: {display: true}});
            }
            else{
                this.props.dispatch({type: UPDATE_RATINGS, payload: {value: 0, display: false}});
                this.props.dispatch({type: UPDATE_REVIEWS, payload: {message: ''}})
                this.props.dispatch({type: SUBMIT_RATINGS, payload: {display: false}});
            }
            
        });

        /**
         *    Get the information of the Rider to display
         *    Set the timeout of 200ms so that the Redux Store is updated for the previous actions
         */
        axios.post('http://localhost:5001/getRider', {id: this.props.order.assignedTo})
        .then(response => {
            
        })
        }, 200);
    }

    //Update the ratings
    onRatingsChange = event => {
        this.props.dispatch({type: UPDATE_RATINGS, payload: {value: event.target.value, display: true}});
    }

    //Update the review
    onReviewChange = event => {
        this.props.dispatch({type: UPDATE_REVIEWS, payload: {message: event.target.value}});
    }

    onSubmitHandler = event => {
        //Update the ratings and reviews object and make the both the ratings and reviews "Read Only"
        this.props.dispatch({type: SUBMIT_RATINGS, payload: {display: true}});
        
        //Update the user entered review and ratings into the database
        axios.post('http://localhost:5004/submitReview', {
            order_id: this.props.match.params.id,
            ratings: this.props.ratings.value,
            reviews: this.props.reviews.message,
            assign: this.props.order.assignedTo,
            email: this.props.user.email
        })
        .then(response => {
            
        });
        
        //Display all the ratings and reviews for the Rider
        this.props.history.push(`/rider/${this.props.order.assignedTo}`);
    }

    //Move to the Rider's ratings and reviews page
    onClickHandler = event => {
        this.props.history.push(`/rider/${this.props.order.assignedTo}`);
    }

    render() 
    { 
        const orderId = this.props.match.params.id;
        const {classes, subtotal} = this.props;
        
        let message = '';
        
        if(this.props.match.params.message)
             message = this.props.match.params.message;

        let {date, slot} = this.props.order;
        date = date.split('T')[0];
        
        //Check if the currentTime and currentDate is greater than or equal to the Delivery Time and Date
        let currentDate = new Date().getTime();
        let deliveryDate = Date.parse(date);
        let deliveryTime = slot.split(' - ')[1];
        let currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

        //Calculate the totalCost, tax and Shipping
        let tax = (18 * parseFloat(subtotal)/100).toFixed(2);
        let shipping = (15 * parseFloat(subtotal)/100).toFixed(2);
        let totalCost = (parseFloat(tax) + parseFloat(shipping) + parseFloat(subtotal)).toFixed(2);

        return ( 
            <React.Fragment>
                <CustomAppBar />
                <Paper className={classes.paper}>
                    {message ? <Alert variant="success">{message}</Alert> : null}
                    <div className={classes.order_title} align="center">
                        Order Summary
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Typography color="textPrimary" variant="h6">Hi {this.props.user.firstname},</Typography>
                        <Typography color="textPrimary" variant="subtitle1">Your order details are:</Typography>
                    </div>
                    <br/>
                    <div className={classes.section}>
                    <Typography align="left" className={classes.typo}>
                        <Grid container>
                            <Grid item xs={1}><ReceiptIcon /></Grid>
                            <Grid item xs={5} className={classes.typo_subheading}>Order ID</Grid>
                            <Grid item xs={1}><AirportShuttleIcon /></Grid>
                            <Grid item xs={5} className={classes.typo_subheading}>Delivered by</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={5}>{orderId}</Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={5}>{this.props.order.assignName === "" ? "Not Assigned" : this.props.order.assignName}</Grid>
                        </Grid>
                    </Typography>
                    <br/>
                    <Typography align="left" className={classes.typo}>
                        <Grid container xs={12}>
                            <Grid item xs={1}><ScheduleIcon/></Grid> 
                            <Grid item xs={5} align="left" className={classes.typo_subheading}>Expected Delivery</Grid>
                            <Grid item xs={1}><LocationOnIcon/></Grid> 
                            <Grid item xs={5} align="left" className={classes.typo_subheading}>Delivery Address</Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item xs={1}></Grid> 
                            <Grid item xs={5} align="left">{this.props.order.date}</Grid>
                            <Grid item xs={1}></Grid> 
                            <Grid item xs={5} align="left">{this.props.user.address}, {this.props.user.city}</Grid>
                        </Grid>
                    </Typography>
                    <br/>
                    <Typography align="left" className={classes.typo}>
                        <Grid container xs={12}>
                            <Grid item xs={1}><HelpOutlineIcon /></Grid> 
                            <Grid item xs={5} align="left" className={classes.typo_subheading}>Status</Grid>
                            <Grid item xs={1}><ScheduleIcon /></Grid> 
                            <Grid item xs={5} align="left" className={classes.typo_subheading}>Delivery Slot</Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item xs={1}></Grid> 
                            <Grid item xs={5} align="left">{this.props.order.status}</Grid>
                            <Grid item xs={1}></Grid> 
                            <Grid item xs={5} align="left">{this.props.order.slot}</Grid>
                        </Grid>
                    </Typography>
                    </div>
                    <hr/>
                    <br/>
                    <Typography align="left" className={classes.typo_heading}>Items Ordered</Typography><br/>
                    <Grid container xs={12}>
                        {
                            this.props.orderedItems.length > 0 ?
                            this.props.orderedItems.map((item, index) => (
                                <React.Fragment>
                                    <Grid item xs={5}>
                                        <img src={profiles[item.path]} className={classes.img}/>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Grid item xs className={classes.typo_subheading}>{item.itemName}</Grid>
                                        <Grid item xs className={classes.typo}>${item.total_price}</Grid>
                                        <Grid item xs className={classes.typo}>Quantity: {item.quantity}</Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                            : null
                        }
                    </Grid>
                    <hr/>
                    <div className={classes.section}>
                        <Grid container xs={12}>
                            <Grid item xs={5} className={classes.typo_subheading}>Subtotal</Grid>
                            <Grid item xs={7} className={classes.typo_subheading}>${this.props.subtotal}</Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item xs={5} className={classes.typo_subheading}>Shipping</Grid>
                            <Grid item xs={7} className={classes.typo_subheading}>${shipping}</Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item xs={5} className={classes.typo_subheading}>Tax</Grid>
                            <Grid item xs={7} className={classes.typo_subheading}>${tax}</Grid>
                        </Grid>
                        <hr/>
                        <Grid container xs={12}>
                            <Grid item xs={5} className={classes.typo_subheading}>Total Cost</Grid>
                            <Grid item xs={7} className={classes.typo_subheading}>${totalCost}</Grid>
                        </Grid>
                    </div>
                    <br/>
                    {
                        currentDate > deliveryDate || (deliveryTime >= currentTime && currentDate === deliveryDate) ? 
                        <div className={classes.section}>
                            {
                                !this.props.reviews.display ? 
                                <React.Fragment>
                                    <div align="center">
                                        <Typography className={classes.typo_heading}>How was your experience with <a onClick={this.onClickHandler} style={{color: "#003399", cursor: "pointer"}}>{this.props.order.assignName === '' ? "the delivery person" : this.props.order.assignName}</a> ?</Typography>
                                    </div>
                                    <div align="center">
                                        <Rating
                                            name="simple-controlled"
                                            value={this.props.ratings.value}
                                            onChange={this.onRatingsChange}
                                            readOnly={this.props.ratings.display}
                                            size="large"
                                        />
                                    </div>
                                </React.Fragment> : null
                            }
                            
                            <br/>
                            <div align="center">
                                {
                                    this.props.reviews.display ? null : 
                                    <Typography className={classes.typo_subheading}>  Write a review </Typography>
                                }
                                
                                <br/>
                                {this.props.reviews.display ? 
                                <div align="center">
                                    <Typography className={classes.typo_heading}>Thank you for providing us your feedback !!</Typography>
                                    <br/>
                                </div>
                                :
                                <TextField 
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    value={this.props.reviews.message}
                                    onChange={this.onReviewChange}
                                    style={{width: "300px"}}
                                />}
                                <br/>
                                <br/>
                                {

                                    this.props.reviews.display ? null :
                                    <React.Fragment>
                                        <CustomButton onSubmit={this.onSubmitHandler} name="Submit" style={{width: "180px"}} />
                                    </React.Fragment>   
                                }
                            </div>
                        </div> : 
                        null
                    }
                    
                </Paper>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(withStyles(styles), connect(mapStateToProps))(Order);