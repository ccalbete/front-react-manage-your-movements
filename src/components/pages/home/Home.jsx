
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from './../../common/header/Header'
import Summary from "./fixedExpenses/FixedExpenses"
import FixedExpenses from './summary/Summary';


function Home() {

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: "100px" }}>
                        <FixedExpenses />
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: "100px" }}>
                        <Summary />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;
