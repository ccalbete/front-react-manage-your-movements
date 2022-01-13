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
import placeService from './../../../services/places'
import categoryService from "./../../../services/categories"
import paymentModeService from "./../../../services/paymentModes"

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

    /* const places = ["Supermarket Frog", "disco", "el tunel", "t inglesa"];
    const categories = ["Transportation", "salidas", "farmacia"];
    const paymentModes = ["Itau credit card", "Brou debit card", "itau"]; */
    const [places, setPlaces] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [paymentModes, setPaymentModes] = React.useState([]);

    const [selectedPlace, setSelectedPlace] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [enteredAmount, setEnteredAmount] = React.useState("");
    const [selectedPaymentMode, setSelectedPaymentMode] = React.useState("");

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


    const handleChangePlace = (event) => {
        setSelectedPlace(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleChangeAmount = (event) => {
        setEnteredAmount(event.target.value);
    };

    const handleChangePaymentMode = (event) => {
        setSelectedPaymentMode(event.target.value);
    };

    const saveExpense = () => {
        fetch("http://localhost:3000/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                "date": '2022-08',
                "place": selectedPlace,
                "category": selectedCategory,
                "amount": enteredAmount,
                "paymentMode": selectedPaymentMode
            })
        }).then().catch(error => console.error('Error: ', error));

        //reset form
        setSelectedPlace('');
        setSelectedCategory('');
        setEnteredAmount('');
        setSelectedPaymentMode('');
    }

    return (
        <>
            <Header />
            <h1 className={classes.title}>Expense</h1>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="placeLabel">Place</InputLabel>
                <Select labelId="placeLabel"
                    id="placeSelect" value={selectedPlace} label="Place" onChange={handleChangePlace} >
                    <MenuItem key={'empty'} />
                    {places.map(place => {
                        return <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="categoryLabel">Category*</InputLabel>
                <Select labelId="categoryLabel"
                    id="categorySelect" value={selectedCategory} label="Category" onChange={handleChangeCategory} >
                    {categories.map(category => {
                        return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <TextField type='number' label="Amount*" id="amountTextField" value={enteredAmount} sx={{ m: 1, width: 120 }} onChange={handleChangeAmount}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />

            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="paymentModeLabel">Payment mode*</InputLabel>
                <Select labelId="paymentModeLabel"
                    id="paymentModeSelect" value={selectedPaymentMode} label="Payment mode" onChange={handleChangePaymentMode} >
                    {paymentModes.map(paymentMode => {
                        return <MenuItem key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" color='primary' onClick={saveExpense} className={classes.saveButton}> Save </Button>
        </>
    );
}
