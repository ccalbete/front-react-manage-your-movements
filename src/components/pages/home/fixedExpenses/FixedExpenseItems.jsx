

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';

function FixedExpenseItems({ itemsList }) {

    return (
        <>
            <Grid container justifyContent="center">
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List >
                        {itemsList.map(item => {
                            return (
                                <div key={item.id}>
                                    <ListItem >
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            );
                        })}
                    </List>
                </Box>
            </Grid>
        </>
    );
}

export default FixedExpenseItems;