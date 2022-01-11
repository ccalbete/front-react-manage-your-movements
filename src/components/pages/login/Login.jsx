import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PersonSharp, LockSharp } from '@mui/icons-material';
import { InputAdornment } from '@mui/material/';
import ErrorMessage from '../../common/ErrorMessage'


const useStyles = makeStyles({
    container: {
        marginTop: '110px'
    },
    title: {
        textAlign: 'center',
        marginTop: '130px'
    },
    confirmButton: {
        margin: '30px'
    },
    fields: {
        margin: '8px'
    }
});

function Login() {

    const classes = useStyles();

    // let response = false;


    const [showErrorEmptyFields, setShowErrorEmptyFields] = useState(false);
    const [showErrorLoginFails, setShowErrorLoginFails] = useState(false);

    //key is the input name and value is the input content
    const [newValues, setNewValues] = useState({
        username: '',
        password: '',
    });


    // const [redirectHome, setRedirectHome] = useState(false);

    //when the input is filled, the value is stored in newValues.inputName and the input errors is reset
    const writtenUsername = (e) => {
        setNewValues({ ...newValues, 'username': e.target.value });
        setShowErrorEmptyFields(false);
    }

    const writtenPassword = (e) => {
        setNewValues({ ...newValues, 'password': e.target.value });
        setShowErrorEmptyFields(false);
    }

    //if some input is empty, show an error message, else submit
    const attemptLogin = async () => {
        setShowErrorLoginFails(false);

        //if at least one field is empty, show the error and go out the function
        if (!newValues.username || !newValues.password) {
            setShowErrorEmptyFields(true);
            return
        }


        // submit
        // response = usersService.login(newValues.username, newValues.password);
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": newValues.username,
                "password": newValues.password,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            if (response.success) {
                localStorage.setItem("token", response.token);
            } else {
                setShowErrorLoginFails(true);
                return;
            }
        }).catch(error => console.error('Error: ', error));

        // reset form
        setNewValues({
            username: '',
            password: '',
        });

    }

    return (
        <> <h1 className={classes.title}>Login</h1>
            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
                <Grid item className={classes.fields}>
                    <FormControl>
                        <InputLabel htmlFor='username'>Username *</InputLabel>
                        <Input id='username' type='email' value={newValues.username} onChange={writtenUsername} startAdornment={
                            <InputAdornment position="start">
                                <PersonSharp />
                            </InputAdornment>
                        } />
                    </FormControl>
                </Grid>

                <Grid item className={classes.fields}>
                    <FormControl>
                        <InputLabel htmlFor='password'>Password *</InputLabel>
                        <Input id='password' type='password' value={newValues.password} onChange={writtenPassword} startAdornment={
                            <InputAdornment position="start">
                                <LockSharp />
                            </InputAdornment>
                        } />
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button variant="outlined" onClick={attemptLogin} className={classes.confirmButton}> Confirm </Button>
                </Grid>

                <Grid item>
                    {showErrorEmptyFields && <ErrorMessage> All fields are required </ErrorMessage>}
                    {showErrorLoginFails && <ErrorMessage> Wrong username or password </ErrorMessage>}
                </Grid>
            </Grid>
        </>
    );
}

export default Login;