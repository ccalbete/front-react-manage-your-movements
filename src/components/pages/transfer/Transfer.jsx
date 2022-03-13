import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Tooltip from '@mui/material/Tooltip';
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

    const [originAmount, setOriginAmount] = React.useState('');
    const [destinationAmount, setDestinationAmount] = React.useState('');
    const [selectedOrigin, setSelectedOrigin] = React.useState('');
    const [selectedDestination, setSelectedDestination] = React.useState('');

    const [showErrorEmptyFields, setShowErrorEmptyFields] = React.useState(false);
    const [showErrorFailedSave, setShowErrorFailedSave] = React.useState(false);
    const [showErrorOriginAndDestinationEquals, setShowErrorOriginAndDestinationEquals] = React.useState(false);
    const [showSuccesfulSaving, setShowSuccesfulSaving] = React.useState(false);

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

    const handleChangeOriginAmount = (event) => {
        setOriginAmount(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const handleChangeDestinationAmount = (event) => {
        setDestinationAmount(event.target.value);
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
        if (!originAmount || !selectedOrigin || !selectedDestination) {
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
                "originAmount": parseInt(originAmount),
                "destination": selectedDestination,
                "destinationAmount": parseInt(destinationAmount),
            })
        }).then(function (response) {
            if (response.status === 201) {
                setShowSuccesfulSaving(true);
            } else {
                setShowErrorFailedSave(true);
                return;
            }
        }).catch(error => { throw new Error(error); });

        //reset form
        setOriginAmount('');
        setDestinationAmount('');
        setSelectedOrigin('');
        setSelectedDestination('');
        setShowSuccesfulSaving(false);
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
                <Tooltip title="Origin amount">
                    <TextField type='number' label="Amount*" id="amountTextField" value={originAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeOriginAmount}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Tooltip>

                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel id="destinationLabel">Destination*</InputLabel>
                    <Select labelId="destinationLabel"
                        id="destintationSelect" value={selectedDestination} label="Destination" onChange={handleChangeDestination} >
                        {paymentModes.map(paymentMode => {
                            return <MenuItem key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Tooltip title="Destination amount">
                    <TextField type='number' label="Amount" id="amountTextField" value={destinationAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeDestinationAmount}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />
                </Tooltip>

                <Button variant="contained" color='primary' onClick={saveTransfer} className={classes.saveButton} style={{ backgroundColor: "#1c73d3" }}> Save </Button>
            </div>
            {showErrorEmptyFields && <ErrorMessage> All fields are required </ErrorMessage>}
            {showErrorOriginAndDestinationEquals && <ErrorMessage> Origin and destination can't be the same </ErrorMessage>}
            {showErrorFailedSave && <ErrorMessage> Save transfer failed </ErrorMessage>}
            {showSuccesfulSaving && <SuccessMessage> Successfully saved transfer</SuccessMessage>}
        </>
    );

}
