import React, { Component } from 'react';

const CustomInput = props => {
    const onChange = e => {
        props.onChange(e.target.value);
    }
    return (
        <input defaultValue={props.defaultValue} onChange={onChange} />
    );
}

export default CustomInput;
