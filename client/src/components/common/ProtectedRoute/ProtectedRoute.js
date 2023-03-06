import React from 'react';
import { Route } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../../feature/services/auth';
import { useHistory } from 'react-router-dom';
import ReLoginSVG from '../../../assets/img/relogin.svg';
import UnauthorizedSVG from '../../../assets/img/unauthorized.svg';
import styles from './ProtectedRoute.module.css';
import Button from '../Button/Button';

const ProtectedRoute = ({ children, ...rest }) => {
    const { data, isLoading } = useIsLoggedInQuery();
    const history = useHistory();
    const permittedRoles = rest["permitted-roles"] || [];


    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoading ? (
                    <div>Loading...</div>
                ) : data.isLoggedIn ? (
                    permittedRoles.length === 0 || permittedRoles.includes(data.user.role) ? (
                        children
                    ) : (
                        <div className={styles.container}>
                            <img src={UnauthorizedSVG} alt="unauthorized" />
                            <p>Not authorized</p>
                            <Button onClick={() => history.push("/")} label="Back" />
                        </div>
                    )
                ) : (
                    <div className={styles.container}>
                        <img src={ReLoginSVG} alt="relogin" />
                        <p>You need to login to view this page</p>
                        <Button onClick={() => history.push("/")} label="Login" />
                    </div>
                )
            }
        />
    );



};

export default ProtectedRoute;