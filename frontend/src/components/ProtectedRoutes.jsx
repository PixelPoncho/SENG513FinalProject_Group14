// Importing Components from node_modules
import React, {useEffect} from 'react';
import { Navigate } from "react-router-dom";

/*
 * Function used to update each page's <title> tag. This tag is
 * typically found in the public folder (index.html), and would
 * otherwise be static
 */
const Page = (props) => {
  useEffect(() => {
    document.title = props.title || '';
  }, [props.title]);
  return props.children;
};

// Routes that require authentication to access
export const AuthRoute = ({ children, title }) => {
  const authSession = sessionStorage.getItem('auth');

  return (
    authSession ? (<Page title={title}>{children}title</Page>) : (<Navigate to="/login" />)
  );
};

// Routes that authenticated users should not be able to access
export const UnauthRoute = ({ children, title }) => {
  const authSession = sessionStorage.getItem('auth');

  return (
    authSession === null ? (<Page title={title}>{children}title</Page>) : (<Navigate to="/avatars" />)
  );
};

function ProtectedRoutes() {
  return (
    <div>ProtectedRoutes</div>
  );
}

export default ProtectedRoutes;
