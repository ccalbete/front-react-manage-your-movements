import React from 'react';
import Category from './Category'
import { Grid } from '@material-ui/core'

export default function Summary() {

    const categories = [
        {
            id: 1,
            name: 'Food',
            amount: '100'
        }, {
            id: 2,
            name: 'Booking',
            amount: '200'
        },
        {
            id: 3,
            name: 'Supermarket',
            amount: '300'
        }, {
            id: 4,
            name: 'English',
            amount: '400'
        }, {
            id: 5,
            name: 'TV',
            amount: '500'
        }, {
            id: 6,
            name: 'Table',
            amount: '600'
        }
    ]
    return (
        <>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {categories.map(category =>
                    <Grid item xs={2} sm={4} md={4} key={category.id} >  <Category title={category.name} amount={category.amount} /> </Grid>
                )}
            </Grid>

        </>

    );
} 