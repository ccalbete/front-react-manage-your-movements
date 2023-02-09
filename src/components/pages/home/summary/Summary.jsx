import React from 'react';
import Category from './Category'
import { Grid } from '@material-ui/core'

import categoryService from "./../../../../services/categories"

export default function Summary() {

    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        async function getCategories() {
            try {
                //Fetch
                const categoriesFromApi = await categoryService.getUserNotFixedExpensesCategories();

                setCategories(categoriesFromApi);

            } catch (error) { throw new Error(error); }
        } getCategories();
    }, []);


    return (
        <>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {categories.map(category =>
                    <Grid item xs={2} sm={4} md={4} key={category.id} >  <Category title={category.name} amount={category.spent} /> </Grid>
                )}
            </Grid>
        </>

    );
} 