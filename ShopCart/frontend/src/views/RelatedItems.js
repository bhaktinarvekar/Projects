import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CustomCard from '../components/CustomCard';
import {Grid, FormHelperText, Fab, Button, CardActionArea, CardMedia, CardContent, Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Card } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {compose} from 'redux';
import {profiles} from '../store/images';
import { withRouter, Redirect } from 'react-router-dom';
import {ADD_ITEM, DELETE_ITEM, RELATED_ITEMS, FETCH_ITEM} from '../reducers/actions';

const styles = theme => ({
    card: {
        flex: "0 0 auto",
        display: "flex",
        height: "400px",
        width: "300px",
        margin: "20px",
    },
    scrollView: {
        display: "flex",
        overflowX: "auto",
        '::-webkit-scrollbar': {
            display: "none !important"
        }
    },
    div: {
        '::-webkit-scrollbar': {
            display: "none !important"
        }
    },
    infoTest: {
        display: "flex",
        margin: "5px"
    },
    button: {
        width: "180px",
        marginTop: "140px",
        margin: "20px",
        cursor: "pointer"
    },
    media: {
        height: "300px",
        width: "280px"
    }
});

class RelatedItems extends Component 
{
    /**
     *      If the user selects any item from the Related Items then 
     *      1. Fetch the selected item from the all_items arrays and update the current_item object
     *      2. Update the relatedItems array so that the selected item is not displayed
     */
    onClickHandler = (item, event) => {
        this.props.dispatch({type: FETCH_ITEM, payload: {item}});
        this.props.dispatch({type: RELATED_ITEMS, payload: {id: item.id}});
        this.props.history.push(`/viewitems/${item.category}/${item.id}`);
    }
    
    
    related_items = event => {
        
        let relatedItemsArray = [];
        const {relatedItems} = this.props;

        /**
         *      To display all the items in the horizontal scrollbar, select a single item from the relatedItem and 
         *      put all its detail into the Card and push the Card into another array and return the array.
         */
        for(let i=0; i<relatedItems.length; i++)
        {
            relatedItemsArray.push(
                <Card key={relatedItems[i].key} className={this.props.classes.card}>
                    <CardActionArea>
                        <CardMedia image={profiles[relatedItems[i].path]} className={this.props.classes.media}/>
                        <CardContent onClick={(event) => this.onClickHandler(relatedItems[i])}>
                            <Typography variant="h6">{relatedItems[i].itemName}</Typography>
                            <Typography variant="subtitle">Price: ${relatedItems[i].price}</Typography><br/>
                            <Typography variant="subtitle">{relatedItems[i].quantity > 0 ? 'In Cart: ' : null }{relatedItems[i].quantity > 0 ? relatedItems[i].quantity:null}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        }
        return relatedItemsArray;
    }

    moveLeft = event => {
        this.refs.scrollDiv.scrollLeft -= 300;
    }

    moveRight = event => {
        this.refs.scrollDiv.scrollLeft += 320;
    }

    render() 
    {
        const {classes} = this.props;
        return (
            <div className={classes.infoTest}>
               
               <Fab aria-label="like" className={classes.button} onClick={this.moveLeft}>
                    <ChevronLeftIcon  />
                </Fab>

                <div ref="scrollDiv" className={classes.scrollView}>
                    {this.related_items()}
                </div>

               <Fab aria-label="like" className={classes.button} onClick={this.moveRight}>
                    <ChevronRightIcon />
                </Fab>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {relatedItems} = state;
    return {relatedItems};
}

export default compose(connect(mapStateToProps), withStyles(styles), withRouter)(RelatedItems);