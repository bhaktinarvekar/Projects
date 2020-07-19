import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const CustomIconButton = props => {
    return(
        <div>
            <IconButton>
                <AddCircleOutlineIcon />
            </IconButton>
        </div>
    );
}

export default CustomIconButton;