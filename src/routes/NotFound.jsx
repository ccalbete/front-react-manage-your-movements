import React from 'react';
import { Link } from 'react-router-dom';

import routePaths from './routePaths';

const NotFound = () => {
    return (
        <>
            <span >404 Not Found</span>
            <Link to={routePaths.login} >
                Go back to login
            </Link>
        </>
    )
};

export default NotFound;