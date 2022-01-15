import React from "react";
import Login from "./../components/pages/login/Login"
import { Routes, Route } from "react-router-dom";
import Home from "./../components/pages/home/Home"
import Expense from "./../components/pages/expense/Expense"
import Income from "./../components//pages/income/Income"
import Transfer from "./../components/pages/transfer/Transfer"
import routePaths from "./routePaths"
import NotFound from "./NotFound"


function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path={routePaths.login} element={<Login />} />
                <Route path={routePaths.home} element={<Home />} />
                <Route path={routePaths.expense} element={<Expense />} />
                <Route path={routePaths.income} element={<Income />} />
                <Route path={routePaths.transfer} element={<Transfer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>);
}

export default AppRoutes;