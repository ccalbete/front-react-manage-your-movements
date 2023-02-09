import React from "react";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    footer: {
        textAlign: 'center',
        marginTop: '300px'
    }
});

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            &copy; Copyright 2021, Cinthya Calbete. All rights reserved.
        </footer >
    );

}

export default Footer;