import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import CustomCard from '../components/CustomCard';
import CustomAppBar from '../components/CustomAppBar';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {ADD_ITEM, DELETE_ITEM, RELATED_ITEMS} from '../reducers/actions';
import {VIEW_ITEMS, ALL_ITEMS} from '../reducers/actions';
import SearchResults from './SearchResults';
import AuthService from '../utils/AuthService';


const styles = theme => ({
    appbar: {
        margin: 0
    },
    items: {
        marginTop:50,
        marginLeft: 10,
        marginRight: 10
    },
    category: {
        marginTop: "100px",
        textTransform: "capitalize",
        fontSize: 50,
        marginLeft: 30,
        color: "grey"
    }
    
})

class ViewItems extends Component {

    componentWillMount()
    {
        const auth = new AuthService();

        //If the user is not authenticated then redirect to the "Login" page
        if(!auth.isAuthenticated()) {
            this.props.history.push("/login");
        }

        var category = this.props.match.params.category;
        
        //fetch all the items for the given category from the database and update the viewItems object into the redux Store
        axios.post('http://localhost:5002/viewItems', {
            name: category
        })
        .then(response => {
            this.props.dispatch({type: VIEW_ITEMS, payload: {viewItems: response.data}});
        })


        //Fetch all the items from the database and update them into the allItems object into the redux store
        axios.get('http://localhost:5002/allItems')
        .then(response => {
            this.props.dispatch({type:ALL_ITEMS, payload: {allItems: response.data}});
        });
    }

    onClickHandler = (item, event) => {
        this.props.dispatch({type: RELATED_ITEMS, payload: {id: item.id}});
        this.props.history.push(`/viewitems/${item.category}/${item.id}`);
    }


    render() { 
        const { classes, cartItems, viewItems, searched, searchedItems } = this.props;
        return ( 
            <React.Fragment>
                <CustomAppBar className={classes.appbar} />
                    {(!searched) ? 
                    <React.Fragment>
                        <Typography variant="h1" className={classes.category}>{viewItems ? viewItems.length > 0 ? viewItems[0].category : null : null}</Typography>
                        <Grid className={classes.items} container direction="row" xs={12} spacing={1}>
                            
                                {viewItems ? viewItems.length > 0 ? viewItems.map((item, index) => (
                                    <Grid item xs={3}>
                                        <CustomCard 
                                            className={classes.root}
                                            key={item.id}
                                            itemName={item.itemName} 
                                            price={item.price} 
                                            path={item.path} 
                                            quantity={item.quantity}
                                            onAddClick={()=>this.props.dispatch({type:ADD_ITEM, payload: {item}})} 
                                            onDeleteClick={()=>this.props.dispatch({type:DELETE_ITEM, payload: {id: item.id}})}
                                            onClickHandler={this.onClickHandler.bind(this, item)}
                                        />
                                    </Grid>
                                )) : null : null
                            }
                        </Grid> 
                        </React.Fragment>
                        : 
                        <SearchResults />   
                    } 
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => 
{
    return {...state};
}

export default compose(connect(mapStateToProps), withStyles(styles))(ViewItems);