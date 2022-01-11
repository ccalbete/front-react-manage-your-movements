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


export default function Income() {
    const classes = useStyles();

    const reasons = ["sueldo", "regalo", "sobro mes anterior"];
    const paymentModes = ["brou", "santander", "itau"];

    const [reason, setReason] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [paymentMode, setPaymentMode] = React.useState('');



    const handleChangeReason = (event) => {
        setReason(event.target.value);
    };

    const handleChangAmount = (event) => {
        setAmount(event.target.value);
    };

    const handleChangePaymentMode = (event) => {
        setPaymentMode(event.target.value);
    };

    const saveIncome = () => {
        console.log('saved')
    }

    return (
        <>
            <h1 className={classes.title}>Income</h1>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="reasonLabel">Reason</InputLabel>
                <Select labelId="reasonLabel"
                    id="reasonSelect" value={reason} label="Reason" onChange={handleChangeReason} >
                    {reasons.map(reason => {
                        return <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <TextField type='number' label="Amount*" id="amountTextField" value={amount} sx={{ m: 1, width: 120 }} onChange={handleChangAmount}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />

            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="paymentModeLabel">Payment mode*</InputLabel>
                <Select labelId="paymentModeLabel"
                    id="paymentModeSelect" value={paymentMode} label="Payment mode" onChange={handleChangePaymentMode} >
                    {paymentModes.map(paymentMode => {
                        return <MenuItem key={paymentMode} value={paymentMode}>{paymentMode}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" color='primary' onClick={saveIncome} className={classes.saveButton}> Save </Button>
        </>
    );
}
