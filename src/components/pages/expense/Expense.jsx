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


export default function Expense() {
    const classes = useStyles();

    const places = ["Supermarket frog", "disco", "el tunel", "t inglesa"];
    const categories = ["Comida", "salidas", "farmacia"];
    const paymentModes = ["brou", "santander", "itau"];

    const [place, setPlace] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [paymentMode, setPaymentMode] = React.useState('');


    const handleChangePlace = (event) => {
        setPlace(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangAmount = (event) => {
        setAmount(event.target.value);
    };

    const handleChangePaymentMode = (event) => {
        setPaymentMode(event.target.value);
    };

    const saveExpense = () => {
        console.log('saved')
    }

    return (
        <>
            <h1 className={classes.title}>Expense</h1>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="placeLabel">Place</InputLabel>
                <Select labelId="placeLabel"
                    id="placeSelect" value={place} label="Place" onChange={handleChangePlace} >
                    <MenuItem key={'empty'} />
                    {places.map(place => {
                        return <MenuItem key={place} value={place}>{place}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="categoryLabel">Category*</InputLabel>
                <Select labelId="categoryLabel"
                    id="categorySelect" value={category} label="Category" onChange={handleChangeCategory} >
                    {categories.map(category => {
                        return <MenuItem key={category} value={category}>{category}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <TextField type='number' label="Amount*" id="amountTextField" value={amount} sx={{ m: 1, width: 120 }} onChange={handleChangAmount}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />

            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="paymentModeLabel">Payment mode*</InputLabel>
                <Select labelId="paymentModeLabel"
                    id="paymentModeSelect" value={paymentMode} label="Payment mode" onChange={handleChangePaymentMode} >
                    {paymentModes.map(paymentMode => {
                        return <MenuItem key={paymentMode} value={paymentMode}>{paymentMode}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" color='primary' onClick={saveExpense} className={classes.saveButton}> Save </Button>
        </>
    );
}
