import React from 'react';
import { Link } from 'react-router-dom';

import routePaths from './routePaths';

const NotFound = () => {
    return (
        <>
            <span >404 Not Found</span>
            <br />
            <Link to={routePaths.home} >
                Go back to home
            </Link>
        </>
    )
};

export default NotFound;