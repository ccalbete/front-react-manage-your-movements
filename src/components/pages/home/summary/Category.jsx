
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
    }
});

function Category({ title, amount }) {
    const classes = useStyles();
    return (
        <Card variant="outlined" sx={{ minWidth: 275 }} className={classes.card}>
            <CardContent>
                <Typography variant="h3" component="div">
                    ${amount}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Category;
