import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete';
import Header from './../../common/header/Header'
import placeService from './../../../services/places'
import categoryService from "./../../../services/categories"
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


export default function Expense() {
    const classes = useStyles();

    const [places, setPlaces] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [paymentModes, setPaymentModes] = React.useState([]);

    const [selectedPlace, setSelectedPlace] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [enteredAmount, setEnteredAmount] = React.useState("");
    const [selectedPaymentMode, setSelectedPaymentMode] = React.useState("");

    const [showErrorEmptyFields, setShowErrorEmptyFields] = React.useState(false);
    const [showErrorFailedSave, setShowErrorFailedSave] = React.useState(false);
    const [showErrorSuccesfulSaving, setShowErrorSuccesfulSaving] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            try {
                //Fetch
                const placesFromApi = await placeService.getUserPlaces();
                setPlaces(placesFromApi);

                const categoriesFromApi = await categoryService.getUserCategories();
                setCategories(categoriesFromApi);

                const paymentModesFromApi = await paymentModeService.getUserPaymentModes();
                setPaymentModes(paymentModesFromApi);

            } catch (error) {
                throw new Error(error);
            }
        } getData();
    }, []);


    const handleChangePlace = (event, value) => {
        setSelectedPlace({
            id: value.id,
            name: value.name
        })
        setShowErrorEmptyFields(false);
    };

    const handleChangeCategory = (event, value) => {
        setSelectedCategory({
            id: value.id,
            name: value.name
        })
        setShowErrorEmptyFields(false);
    };

    const handleChangeAmount = (event) => {
        setEnteredAmount(event.target.value);
        setShowErrorEmptyFields(false);
    };

    const handleChangePaymentMode = (event, value) => {
        setSelectedPaymentMode({
            id: value.id,
            name: value.name
        });
        setShowErrorEmptyFields(false);
    };

    const saveExpense = () => {

        if (!enteredAmount || !selectedPaymentMode || !selectedCategory || !selectedPlace) {
            setShowErrorEmptyFields(true);
            return
        }

        fetch("http://localhost:3000/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                "date": new Date(),
                "place": selectedPlace.id,
                "category": selectedCategory.id,
                "amount": parseInt(enteredAmount),
                "paymentMode": selectedPaymentMode.id,
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
        setSelectedPlace('');
        setSelectedCategory('');
        setEnteredAmount('');
        setSelectedPaymentMode('');
        setShowErrorSuccesfulSaving(false);
    }

    return (
        <>
            <Header />
            <h1 className={classes.title}>Expense</h1>


            < div style={{ margin: "auto" }}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <Autocomplete
                        id="placePicklist"
                        options={places}
                        getOptionLabel={(place) => `${place.name}`}
                        sx={{ width: 300, margin: 'auto' }}
                        onChange={handleChangePlace}
                        renderInput={(params) => <TextField {...params} label="Place" />}
                        inputValue={selectedPlace.name}
                        key={selectedPlace} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <Autocomplete
                        id="categoryPicklist"
                        options={categories}
                        getOptionLabel={(category) => `${category.name}`}
                        sx={{ width: 300, margin: 'auto' }}
                        onChange={handleChangeCategory}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        inputValue={selectedCategory.name}
                        key={selectedCategory} />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <Autocomplete
                        id="paymentModePicklist"
                        options={paymentModes}
                        getOptionLabel={(paymentMode) => `${paymentMode.name}`}
                        sx={{ width: 300, margin: 'auto' }}
                        onChange={handleChangePaymentMode}
                        renderInput={(params) => <TextField {...params} label="Payment mode*" />}
                        inputValue={selectedPaymentMode.name}
                        key={selectedPaymentMode} />
                </FormControl>

                <TextField type='number' label="Amount*" id="amountTextField" value={enteredAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeAmount}
                />

                <Button variant="contained" color='primary' onClick={saveExpense} className={classes.saveButton} style={{ backgroundColor: "#1c73d3" }}> Save </Button>
            </div >
            {showErrorEmptyFields && <ErrorMessage> All fields are required </ErrorMessage>}
            {showErrorFailedSave && <ErrorMessage> Save expense failed </ErrorMessage>}
            {showErrorSuccesfulSaving && <SuccessMessage> Successfully saved expense</SuccessMessage>}
        </>
    );
}

