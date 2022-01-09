
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Header from './../../common/header/Header'
import Summary from "./fixedExpenses/FixedExpenses"
import FixedExpenses from './summary/Summary';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function Home() {

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Item> <Header /> </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item> <FixedExpenses /> </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item> <Summary /> </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;
