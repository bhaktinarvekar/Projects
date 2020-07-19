import React, { Component } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { UPDATE_RIDER } from '../reducers/actions';

const styles = themes => ({
    paper: {
        width: "90%",
        height: "auto",
        padding: "10px",
        margin: "20px",
        marginLeft: 20
    },
    typo_head: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "black"
    },
    typo_h1: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#009973",
        marginTop: 20
    },
    typo_p: {
        fontSize: "18px",
        color: "black"
    },
    review: {
        width: "1500px",
        height: "auto",
        padding: "20px",
        paddingBottom: "50px",
        backgroundColor: "#d9f2e6",
        borderRadius: 15,
        marginBottom: 20,
    },
    heading: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        marginLeft: 20
    },
    div_head: {
        width:"90%",
        height: "100px",
        backgroundColor: "#009973",
        marginLeft: 20,
        marginTop: 20,
        color: "white",
        boxShadow: "10px 10px 5px #aaaaaa",
        borderRadius: 15
    }
})

class RiderReview extends Component 
{

    componentWillMount() 
    {
        /*
         *      Fetch all the reviews for a Rider and update the rider object into the redux store
         */
        axios.post('http://localhost:5004/getRiderReviews', {id: this.props.match.params.id})
        .then(response => {
            const { ratings, reviews } = response.data;
            this.props.dispatch({type: UPDATE_RIDER, payload: {reviews, ratings}});
        })
    }

    render() { 

        const { classes } = this.props;

        return ( 
            <React.Fragment>
                <div className={classes.div_head}>
                    <Typography className={classes.heading}>{this.props.order.assignName}</Typography>
                    <Grid container xs={12}>  
                        <Grid item ><Rating value={this.props.rider.ratings} readOnly size="medium" style={{marginLeft: 20}}/></Grid>
                        <Grid item style={{marginLeft: 10}}><Typography>{Math.ceil(this.props.rider.ratings)} out of 5</Typography></Grid>
                    </Grid>
                </div>
                <Paper className={classes.paper}>
                    <div>
                        <Typography className={classes.typo_h1}>Customer Reviews</Typography>
                        <br/>
                        <hr style={{width: 10}}/>
                        {
                            this.props.rider.reviews.length > 0 ? 
                            this.props.rider.reviews.map((review, index) => (
                                <div key={index} elevation={2} className={classes.review}>
                                    <Typography className={classes.typo_head}>{review.name ? review.name : "Anonymous User"}</Typography>
                                    <Rating value={review.rate} readOnly size="small"/><br/>
                                    <Typography variant="subtitle-2">Reviewed on: {review.timestamp.split("T")[0]}</Typography>
                                    <hr/>
                                    <Typography className={classes.typo_p}>{review.reviews}</Typography>
                                </div>
                            ))
                            : 
                            null
                        }
                    </div>
                </Paper>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(withStyles(styles), connect(mapStateToProps))(RiderReview);