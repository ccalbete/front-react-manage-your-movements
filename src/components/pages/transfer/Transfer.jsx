import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginTop: '80px'
    },
    saveButton: {
        marginLeft: '10px',
        marginTop: '17px'
    }
});


export default function Transfer() {
    const classes = useStyles();

    const paymentModes = ["brou", "santander", "itau"];

    const [amount, setAmount] = React.useState('');
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');


    const handleChangAmount = (event) => {
        setAmount(event.target.value);
    };

    const handleChangeOrigin = (event) => {
        setOrigin(event.target.value);
    };

    const handleChangeDestination = (event) => {
        setDestination(event.target.value);
    };

    const saveTransfer = () => {
        console.log('saved')
    }

    return (
        <>
            <h1 className={classes.title}>Income</h1>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="originLabel">Origin*</InputLabel>
                <Select labelId="originLabel"
                    id="originSelect" value={origin} label="Origin" onChange={handleChangeOrigin} >
                    {paymentModes.map(paymentMode => {
                        return <MenuItem key={paymentMode} value={paymentMode}>{paymentMode}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <TextField type='number' label="Amount*" id="amountTextField" value={amount} sx={{ m: 1, width: 120 }} onChange={handleChangAmount}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />

            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="destinationLabel">Destination*</InputLabel>
                <Select labelId="destinationLabel"
                    id="destintationSelect" value={destination} label="Destination" onChange={handleChangeDestination} >
                    {paymentModes.map(paymentMode => {
                        return <MenuItem key={paymentMode} value={paymentMode}>{paymentMode}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" color='primary' onClick={saveTransfer} className={classes.saveButton}> Save </Button>
        </>
    );
}
