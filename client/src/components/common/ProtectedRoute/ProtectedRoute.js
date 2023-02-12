import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useCheckLoginQuery } from '../../../feature/services/auth';

const ProtectedRoute =  ({ children,  ...rest }) => {
    const {  data , isLoading } = useCheckLoginQuery();
    const isLoggedIn = data?.isLoggedIn || false;
    console.log("data", data);
    console.log("In ProtectedRoute, isLoggedIn: ", isLoggedIn)
    // TODO : implement a loading screen
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoading ? ( <div>Loading...</div> ) :
                isLoggedIn ? ( children ) : ( <Redirect to={{ pathname: "/landing", state: { from: location } }} />
                )
            }
        />
    );


    
};

export default ProtectedRoute;