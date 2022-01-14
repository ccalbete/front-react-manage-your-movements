import React from "react";
import Login from "./components/pages/login/Login"
import Footer from "./components/common/Footer"
//import Home from "./components/pages/home/Home"
import Expense from "./components/pages/expense/Expense"
import Income from "./components/pages/income/Income"
import Transfer from "./components/pages/transfer/Transfer"


function App() {
    return (
        <>
            <Login />
            <Income />
            <Footer />
        </>);
}

export default App;