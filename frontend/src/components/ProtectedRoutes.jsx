// TODO: Implement this in the Routes.jsx file without the multiple sets of errors appearing

// Importing Components from node_modules
import React from 'react';
import { Route, Navigate } from "react-router-dom";

// Routes that require authentication to access
export const AuthRoute = ({
  component: Component,
  ...rest
}) => {
  const authSession = sessionStorage.getItem('auth');

  return (
    <Route
      {...rest}
      element={props => {
        if (authSession) {
          return <Component {...props} />;
        } else {
          return (<Navigate to="/login" />);
        }
      }}
    />
  );
};

// Routes that authenticated users should not be able to access
export const UnauthRoute = ({
  component: Component,
  ...rest
}) => {
  const authSession = sessionStorage.getItem('auth');

  return (
    <Route
      {...rest}
      element={props => {
        if (!authSession) {
          return <Component {...props} />;
        } else {
          return (<Navigate to="/avatar" />);
        }
      }}
    />
  );
};


function ProtectedRoutes() {
  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes