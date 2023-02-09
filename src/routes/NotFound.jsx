import React from 'react';
import { Link } from 'react-router-dom';

import routePaths from './routePaths';

const NotFound = () => {
    return (
        <>
            <p style={{ textAlign: 'center', fontSize: '22px', marginTop: '50px' }}>
                404 Page not found
                <br />
                <Link to={routePaths.login} >
                    Go back to login
                </Link> </p>
        </>
    )
};

export default NotFound;