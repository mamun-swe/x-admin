
import React from 'react'
import { checkIfLoggedIn } from '../../utils/Authenticate'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ props, children, ...rest }) {
    const loggedIn = checkIfLoggedIn()

    // Promise.resolve(loggedIn).then(value => {
    //     if (value === false) {
    //         localStorage.clear()
    //     }
    // })

    return (
        <Route
            {...rest}
            render={({ location }) =>
                // loggedIn && loggedIn.role === rest.role ? (
                loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                from: location
                            }}
                        />
                    )
            }
        />
    )
}