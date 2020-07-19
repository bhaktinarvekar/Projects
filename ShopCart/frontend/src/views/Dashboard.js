import React, { Component } from 'react';
import CustomCard from '../components/CustomCard';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import CustomAppBar from '../components/CustomAppBar';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {ALL_CATEGORIES} from '../reducers/actions';
import SearchResults from './SearchResults';
import AuthService from '../utils/AuthService';

const styles = theme => ({
    appbar: {
        margin:0
    },
    categories: {
    },
    paper1: {
        marginTop: 200,
        backgroundColor: "#eee"
    },
    typo: {
        marginTop: 80,
        padding: 20,
        fontFamily: "Dancing Script",
        fontSize: 35,
        color: "grey"
    },
    paper2: {
        marginTop: "40px",
        marginLeft: 10,
        alignContent: "center"
    }
})

class Dashboard extends Component 
{
    //display the items of the selected category
    onClickHandler = event => {
        var elem = event.target.innerHTML;
        this.props.history.push(`/viewitems/${event.target.innerHTML}`);
    }

    //Display User's past orders
    onSubmitOrders = event => {
        this.props.history.push('/myorders');
    }

    //remove the token and state from the localStorage on logging out
    onSubmitLogout = event => {
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        this.props.history.push('/login');
    }

   componentWillMount() {

        const auth = new AuthService();
        
        //If the user is not authenticated redirect him to the login page
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }

        //load all the categories that are to be displayed
        axios.get("http://localhost:5002/selectCategories")
            .then(res => {
                console.log(res.data);
                this.props.dispatch({type: ALL_CATEGORIES, payload: {categories: [...res.data]}});
            })
    }
    
    render() {
        const {classes, categories, searched, viewItems, searchedItems} = this.props;
        
        return ( 
            <Box>
                <CustomAppBar className={classes.appbar} onSubmitOrders={this.onSubmitOrders} onSubmitLogout={this.onSubmitLogout} />
                    {(!searched) ? 
                        <Paper className={classes.paper2} elevation={0}>
                        <Typography className={classes.typo} variant="h5">Browse Categories</Typography>
                            <Grid className={classes.categories} container alignContent="space-around" spacing={1} xs={12} direction="row">
                                {
                                categories ? categories.map((category, index) => (
                                    <Grid item xs={3}>
                                        <CustomCard onClick={this.onClickHandler} path={category.path} category={category.name} key={category.id} />
                                    </Grid> )) : null
                                }
                            </Grid>
                        </Paper> : <SearchResults />
                    }
            </Box>
         );
    }
}

const mapStateToProps = state => {
   return {
       ...state
   }
}

export default compose(connect(mapStateToProps),withStyles(styles))(Dashboard);