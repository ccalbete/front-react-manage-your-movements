
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Header from './../../common/header/Header'
import Summary from "./fixedExpenses/FixedExpenses"
import FixedExpenses from './summary/Summary';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    itemsSpace: {
        marginTop: '180px'
    }
});



function Home() {
const classes = useStyles();

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                       <Header />
                    </Grid>
                    <Grid item xs={6} className={classes.itemsSpace}>
                         <FixedExpenses /> 
                    </Grid>
                    <Grid item xs={6} className={classes.itemsSpace}>
                        <Summary /> 
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;
