import React from 'react';
import { MenuItem, Menu } from '@material-ui/core';


const CustomMenu = props => 
{
    return (
        <div>
            <Menu
                open={props.open}
                onClose={props.onClose}
                keepMounted
                anchorOrigin={props.anchorOrigin}
                transformOrigin={props.transformOrigin}
            >
                {
                    props.menus ? props.menus.map((menu, index) => 
                        <MenuItem key={index} onClick={props.onClose}>{menu}</MenuItem>) : null
                }

            </Menu>
        </div>
    );
}

export default CustomMenu;