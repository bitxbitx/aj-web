import React from 'react';
import { Route } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../../feature/services/auth';
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
    const { data, isLoading } = useIsLoggedInQuery();
    const isLoggedIn = data?.isLoggedIn || false;
    const role = data?.role || "";
    const history = useHistory();
    const permittedRoles = rest["permitted-roles"] || [];

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoading ? (<div>Loading...</div>) :
                    isLoggedIn && permittedRoles.includes(role) ? (children) : (
                        history.push({
                            pathname: "/",
                            state: { from: location }
                        })
                    )
            }
        />
    );



};

export default ProtectedRoute;