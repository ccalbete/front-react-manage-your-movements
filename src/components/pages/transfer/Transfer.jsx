import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Header from './../../common/header/Header'
import paymentModeService from "./../../../services/paymentModes"
import ErrorMessage from '../../common/ErrorMessage'
import SuccessMessage from '../../common/SuccessMessage'

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

    const [paymentModes, setPaymentModes] = React.useState([])

    const [enteredAmount, setEnteredAmount] = React.useState('');
    const [selectedOrigin, setSelectedOrigin] = React.useState('');
    const [selectedDestination, setSelectedDestination] = React.useState('');

    const [showErrorEmptyFields, setShowErrorEmptyFields] = React.useState(false);
    const [showErrorFailedSave, setShowErrorFailedSave] = React.useState(false);
    const [showErrorOriginAndDestinationEquals, setShowErrorOriginAndDestinationEquals] = React.useState(false);
    const [showErrorSuccesfulSaving, setShowErrorSuccesfulSaving] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            try {
                //Fetch
                const paymentModesFromApi = await paymentModeService.getUserDebitPaymentModes();
                setPaymentModes(paymentModesFromApi);

            } catch (error) {
                throw new Error(error);
            }
        }
        getData();
    }, []);

    const handleChangeAmount = (event) => {
        setEnteredAmount(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const handleChangeOrigin = (event) => {
        setSelectedOrigin(event.target.value);
        setShowErrorEmptyFields(false);
        setShowErrorOriginAndDestinationEquals(false);
    };

    const handleChangeDestination = (event) => {
        setSelectedDestination(event.target.value);
        setShowErrorEmptyFields(false);
        setShowErrorOriginAndDestinationEquals(false);
    };

    const saveTransfer = () => {
        if (!enteredAmount || !selectedOrigin || !selectedDestination) {
            setShowErrorEmptyFields(true);
            return
        }

        if (selectedOrigin === selectedDestination) {
            setShowErrorOriginAndDestinationEquals(true);
            return
        }

        fetch("http://localhost:3000/transfers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                "date": new Date(),
                "origin": selectedOrigin,
                "amount": parseInt(enteredAmount),
                "destination": selectedDestination
            })
        }).then(function (response) {
            if (response.status === 201) {
                setShowErrorSuccesfulSaving(true);
            } else {
                setShowErrorFailedSave(true);
                return;
            }
        }).catch(error => { throw new Error(error); });

        //reset form
        setEnteredAmount('');
        setSelectedOrigin('');
        setSelectedDestination('');
        setShowErrorSuccesfulSaving(false);
    }

    return (
        <>
            <Header />
            <h1 className={classes.title}>Transfer</h1>
            <div style={{ marginLeft: "650px", marginTop: "100px" }}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="originLabel">Origin*</InputLabel>
                    <Select labelId="originLabel"
                        id="originSelect" value={selectedOrigin} label="Origin" onChange={handleChangeOrigin} >
                        {paymentModes.map(paymentMode => {
                            return <MenuItem key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField type='number' label="Amount*" id="amountTextField" value={enteredAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeAmount}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />

                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="destinationLabel">Destination*</InputLabel>
                    <Select labelId="destinationLabel"
                        id="destintationSelect" value={selectedDestination} label="Destination" onChange={handleChangeDestination} >
                        {paymentModes.map(paymentMode => {
                            return <MenuItem key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <Button variant="contained" color='primary' onClick={saveTransfer} className={classes.saveButton} style={{ backgroundColor: "#1c73d3" }}> Save </Button>
            </div>
            {showErrorEmptyFields && <ErrorMessage> All fields are required </ErrorMessage>}
            {showErrorOriginAndDestinationEquals && <ErrorMessage> Origin and destination can't be the same </ErrorMessage>}
            {showErrorFailedSave && <ErrorMessage> Save transfer failed </ErrorMessage>}
            {showErrorSuccesfulSaving && <SuccessMessage> Successfully saved transfer</SuccessMessage>}
        </>
    );
}
