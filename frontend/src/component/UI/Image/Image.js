import React from "react";

import classes from './Image.module.css';

const image = props => (
    <div
        className={classes.image}
        style={{
            backgroundImage: `url(${props.imageUrl})`,
            backgroundSize: props.contain ? 'contain' : 'cover',
            backgroundPosition: props.left ? 'left' : 'center'
        }}
    />
);

export default image;