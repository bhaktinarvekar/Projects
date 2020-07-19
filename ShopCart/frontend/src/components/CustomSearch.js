import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { SEARCHED_ITEMS } from '../reducers/actions';
import ViewItems from '../views/ViewItems';

const style = themes => ({
    inputText: {
        width: "300px"
    }
})

class CustomSearch extends Component 
{
    onChangeHandler = event => {
        
        //It triggers each time a new character is entered by the user and display all the items that matches with the entered input
        if(event.target.value !== '')
        {
            axios.post('http://localhost:5002/filterProducts', {
                value: event.target.value
            })
            .then(response => {
                this.props.dispatch({type: SEARCHED_ITEMS, payload: {items: response.data}});
            })
        }
    }

    render() { 
        const {classes} = this.props;

        return ( 
            <React.Fragment>
                <input type="text" 
                    placeholder="Search..." 
                    className={classes.inputText}
                    onChange = {this.onChangeHandler}
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(withStyles(style), connect(mapStateToProps))(CustomSearch);