import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Header from '../../common/header/Header'
import reasonService from "./../../../services/reasons"
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

export default function Income() {
    const classes = useStyles();

    const [reasons, setReasons] = React.useState([]);
    const [paymentModes, setPaymentModes] = React.useState([]);

    const [selectedReason, setSelectedReason] = React.useState('');
    const [enteredAmount, setEnteredAmount] = React.useState('');
    const [selectedPaymentMode, setSelectedPaymentMode] = React.useState('');

    const [showErrorEmptyFields, setShowErrorEmptyFields] = React.useState(false);
    const [showErrorFailedSave, setShowErrorFailedSave] = React.useState(false);
    const [showErrorSuccesfulSaving, setShowErrorSuccesfulSaving] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            try {
                //Fetch
                const reasonsFromApi = await reasonService.getUserReasons();
                setReasons(reasonsFromApi);

                const paymentModesFromApi = await paymentModeService.getUserDebitPaymentModes();
                setPaymentModes(paymentModesFromApi);

            } catch (error) {
                throw new Error(error);
            }
        } getData();
    }, []);


    const handleChangeReason = (event) => {
        setSelectedReason(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const handleChangeAmount = (event) => {
        setEnteredAmount(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const handleChangePaymentMode = (event) => {
        setSelectedPaymentMode(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const saveIncome = () => {
        if (!selectedReason || !enteredAmount || !selectedPaymentMode) {
            setShowErrorEmptyFields(true);
            return
        }

        fetch("http://localhost:3000/incomes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                "date": new Date(),
                "reason": selectedReason,
                "amount": parseInt(enteredAmount),
                "paymentMode": selectedPaymentMode,
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
        setSelectedReason('');
        setEnteredAmount('');
        setSelectedPaymentMode('');
        setShowErrorSuccesfulSaving(false);
    }

    return (
        <>
            <Header />
            <h1 className={classes.title}>Income</h1>
            <div style={{ marginLeft: "650px", marginTop: "70px" }}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="reasonLabel">Reason*</InputLabel>
                    <Select labelId="reasonLabel"
                        id="reasonSelect" value={selectedReason} label="Reason" onChange={handleChangeReason} >
                        {reasons.map(reason => {
                            return <MenuItem key={reason.id} value={reason.id}>{reason.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField type='number' label="Amount*" id="amountTextField" value={enteredAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeAmount}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }} />

                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="paymentModeLabel">Payment mode*</InputLabel>
                    <Select labelId="paymentModeLabel"
                        id="paymentModeSelect" value={selectedPaymentMode} label="Payment mode" onChange={handleChangePaymentMode} >
                        {paymentModes.map(paymentMode => {
                            return <MenuItem key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <Button variant="contained" color='primary' onClick={saveIncome} className={classes.saveButton} style={{ backgroundColor: "#1c73d3" }}> Save </Button>
            </div>
            {showErrorEmptyFields && <ErrorMessage> All fields are required </ErrorMessage>}
            {showErrorFailedSave && <ErrorMessage> Save income failed </ErrorMessage>}
            {showErrorSuccesfulSaving && <SuccessMessage> Successfully saved income</SuccessMessage>}
        </>
    );
}
