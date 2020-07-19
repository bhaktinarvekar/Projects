import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {FETCH_ITEM} from '../reducers/actions';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import {profiles} from '../store/images';
import { Typography, Grid, Paper } from '@material-ui/core';
import CustomButton from '../components/CustomButton';
import CustomAppBar from '../components/CustomAppBar';
import { ADD_TO_CART, UPDATE_ITEM} from '../reducers/actions';
import RelatedItems from './RelatedItems';
import SearchResults from './SearchResults';
import AuthService from '../utils/AuthService';

const styles = theme => ({
    container: {
        marginTop: "80px",
        display: "flex"
    },
    column1: {
        flex: 1,
    },
    column2: {
        flex: 1,
        margin: "10px"
    },
    heading: {
        fontSize: "50px",
        fontFamily: "Georgia"
    },
    quantity: {
        marginLeft: 50,
        border: "1px solid #ccc",
        borderRadius: 7
    },
    paper: {
        padding: 30,
        margin: "40px",
        marginBottom: "40px"
    },
    heading: {
        fontSize: "24px",
        color: "#003300",
        marginLeft: "20px",
        marginTop: "100px",
        fontWeight: "bold",
        padding: "10px"
    }
})

class Items extends Component 
{
    componentWillMount() {

        const auth = new AuthService();
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }

        const {category, id} = this.props.match.params;
        
        //fetch an item based from the database and update the current item in redux state
        axios.post('http://localhost:5002/getItem', {
            id, category
        })
        .then(response => {
            this.props.dispatch({type: FETCH_ITEM, payload: {item: {...response.data}}});
        });
    }

    onSubmitHandler = event => {
        this.props.dispatch({type: ADD_TO_CART});
    }

    onChangeHandler = event => {
        this.props.dispatch({type: UPDATE_ITEM, payload: {value: event.target.value}});
    }
    
    render() { 
        const {currentItem, classes, searched, searchedItems} = this.props;
        return ( 
            <React.Fragment>
                <CustomAppBar />
                { !searched ? 
                <React.Fragment>
                    <div className={classes.container}>
                        <div className={classes.column1} align="center">
                            <img src={profiles[currentItem.path]} height="500px" width="500px" />
                        </div>
                        <div className={classes.column2} align="left">
                            <Paper elevation={0} className={classes.paper}>
                                <Typography className={classes.heading}>{currentItem.itemName}</Typography><hr/>
                                <Typography>Price: ${currentItem.price}</Typography><br/>
                                <Grid container>
                                    <Grid item xs={1}><Typography>Quantity: </Typography></Grid>
                                    <Grid item xs={6}><input onChange={this.onChangeHandler} id="text" value={currentItem.quantity} className={classes.quantity} type="text"/></Grid>
                                </Grid>
                                <br/>
                                <div align="left">
                                    <CustomButton onSubmit={(event)=>this.onSubmitHandler(currentItem)} name="Add to Cart"/>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <Paper>
                            <Typography className={classes.heading}>Related Items</Typography>
                            <RelatedItems />
                        </Paper>
                    </div>
                </React.Fragment>
                : <SearchResults />}
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    const {currentItem, viewItems, searched, searchedItems} = state;
    return {currentItem, viewItems, searched, searchedItems};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(Items);