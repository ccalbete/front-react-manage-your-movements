
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@material-ui/core';

function Done() {

    return (
        <> <div>
            Mostrando Done
        </div>
            <Grid container justify="center">
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                    <List >
                        <ListItem disablePadding>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemText primary="otro" />
                        </ListItem>
                    </List>
                </Box>
            </Grid>
        </>
    );
}

export default Done;