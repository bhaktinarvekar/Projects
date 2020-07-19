import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Grid, Typography } from '@material-ui/core';
import CustomCard from '../components/CustomCard';
import {ADD_ITEM, DELETE_ITEM, RELATED_ITEMS} from '../reducers/actions';

const styles = themes => ({
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
    },
    error: {
        color: "grey",
        align: "center",
        fontSize: "30px",
        marginLeft: 100
    }
})

/**
 *      This component displays all the searched items
 */
class SearchResults extends Component 
{
    /**
     *      If the user clicks on any of the searched item then fetch the item and update the current_item.
     *      Update the relatedItems array so that the selected item is not displayed
     */
    onClickHandler = (item, event) => {
        this.props.dispatch({type: RELATED_ITEMS, payload: {id: item.id}});
        this.props.history.push(`/viewitems/${item.category}/${item.id}`);
    }

    render() 
    { 
        const {searchedItems, classes, searched} = this.props;
        return ( 
            <React.Fragment>
                <Typography variant="h1" className={classes.category}>Your search results are</Typography>
                    <Grid className={classes.items} container direction="row" xs={12} spacing={1}>
                        {
                            searchedItems.length > 0 && searched ? searchedItems.map(item => (
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
                            )) : (searchedItems.length === 0) ? <Typography className={classes.error}>No results found</Typography> : null
                        }
                    </Grid>
            </React.Fragment>
         );
    }
}
 
const mapStateToProps = state => {
    const {searched, searchedItems} = state;
    return {searched, searchedItems};
}

export default compose(withStyles(styles), connect(mapStateToProps))(SearchResults);