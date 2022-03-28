import React from 'react';
import Category from './Category'
import { Grid } from '@material-ui/core'

import categoryService from "./../../../../services/categories"
import * as currencies from "./../../../../enums/currency.enum"

export default function Summary() {
    const [categoriesToShow, setCategoriesToShow] = React.useState([]);

    React.useEffect(() => {
        async function getCategories() {
            try {
                //Fetch
                const notFixedExpenseCategories = (await categoryService.getUserCategories()).filter(category => !category.is_fixed_expense);

                const categoriesPesosFromApi = await categoryService.getSumUserExpensesByNotFixedCategories(currencies.PESOS);

                const categoriesDollarsFromApi = await categoryService.getSumUserExpensesByNotFixedCategories(currencies.USD);

                const categoriesToShow = {}

                categoriesPesosFromApi.forEach(category => {
                    categoriesToShow[`${category.id}-$`] = {
                        id: category.id,
                        name: category.name,
                        spent: category.spent,
                        symbol: '$',
                    }
                });

                categoriesDollarsFromApi.forEach(category => {
                    categoriesToShow[`${category.id}-USD`] = {
                        id: category.id,
                        name: category.name,
                        spent: category.spent,
                        symbol: 'USD',
                    }
                });

                notFixedExpenseCategories.forEach(category => {
                    if (!categoriesToShow[`${category.id}-$`] && !categoriesToShow[`${category.id}-USD`]) {
                        categoriesToShow[category.id] = {
                            id: category.id,
                            name: category.name,
                            spent: 0,
                            symbol: '',
                        }
                    }
                });

                setCategoriesToShow(categoriesToShow);


            } catch (error) { throw new Error(error); }
        } getCategories();
    }, []);


    return (
        <>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {Object.values(categoriesToShow).map(category =>
                    <Grid item xs={2} sm={4} md={4} key={category.id} >  <Category title={category.name} amount={category.spent} currencySymbol={category.symbol} /> </Grid>
                )}
            </Grid>
        </>

    );
} 