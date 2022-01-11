

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@material-ui/core';

function ToDo({ listItems }) {

    return (
        <>
            <Grid container justifyContent="center">
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List >
                        {listItems.map(item => {
                            <>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemText primary={item} />
                                </ListItem>
                            </>
                        })}
                    </List>
                </Box>
            </Grid>
        </>
    );
}

export default ToDo;