import React from 'react';
import Header from './../../common/header/Header'
import Summary from "./fixedExpenses/FixedExpenses"
import FixedExpenses from './summary/Summary';

function Home() {

    return (
        <>
            <Header />
            <div> Mostrando home </div>
            <Summary />
            <FixedExpenses />
        </>
    );
}

export default Home;