import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

const CustomSelect = props => (
    <FormControl>
        <Typography style={{color: "grey"}}>{props.label}</Typography>
        <Select
          displayEmpty
          autoWidth={props.fullWidth}
          style={{width:"420px"}}
          variant="outlined"
          name={props.name}
          onChange={props.onChange}
        >
        {props.questions.map((item, index) => {
          return (<MenuItem value={index} key={index}>{item}</MenuItem>);
        }
            
        )}
        </Select>
      </FormControl>
);

export default CustomSelect;