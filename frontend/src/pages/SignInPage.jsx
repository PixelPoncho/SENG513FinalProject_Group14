// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

// Import Local Components
import FormError from "../components/FormError";

// Importing icons
import { FiAlertTriangle } from 'react-icons/fi';

// importing styling
import '../styles/SignInPage.scss';

function SignInPage() {
  const [errorInfo, setErrorInfo] = useState("");
  const [credentials, setCredentials] = useState({})
  // Used to update button to inform user that their process is being processed;
  const [isLoading, setIsLoading] = useState(false);
  // Used to change the content currently displayed on the screen
  const [isSuccessful, setIsSuccessful] = useState(false);

  // Arguments for react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onSubmit',
  });

  // The handling of inputs & errors is done automatically through `react-hook-forms`
  const onSubmit = (data, e) => {
    e.target.reset();
    setErrorInfo('');
    setIsLoading(true);

    let tempCredentials = {
      "email_address": `${data.email}`,
      "password": `${data.password}`,
    };

    setCredentials(tempCredentials);
  };

  // Not 100% sure how this will connect to the server, but if there needs to be anything set up from the front end to prep it, put it in here.
  useEffect(() => {
    // if (credentials = {}) {
    //   return;
    // }

    console.log("Send data to server ", credentials)
    // Do something with {credentials}
  }, [credentials])

  // The server should return either a success or error message to then present to the user to help them identify the status of their request. Once again tho, not sure how it will be recieved from the front-end
  useEffect(() => {
    setIsLoading(false);

    if (isSuccessful) {
      // redirect user to their account page
      // Maybe store a particular set of user data that's returned (ie. classes, name, avatar setting?)?
    } else {
      // give the user some context as to what went wrong
    }
  }, [isSuccessful])

  // Change the type of button on display based on if the user has submitted a request to login or not.
  let button;
  if (isLoading) {
    button = <button
      type="submit"
      className="--btn yellow solid"
      disabled
    >
      Loading
    </button>;
  } else {
    button = <button
      type="submit"
      className="--btn yellow solid"
    >
      Sign In
    </button>;
  }

  // Actual login page content.
  return (
    <div className="signin --container">
      <h1 className="signin header">Sign In</h1>

      {/* Login form */}
      <div className="signin-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-input'>
            <div className="form-group">
              <label htmlFor="inputEmail" className='signin sub-header'>
                Email
                <br />
                <input
                  id="inputEmail"
                  className="form-control textbox"
                  type="email"
                  placeholder="e.g. email@domain.com"

                  name="email"
                  {...register('email', { required: true })}
                />

                {/*
                  If the criteria specified above in "register" is not satisfied, spawn an error message. As it is currently set up, regardless of the cause for the error, it will only spawn the single error message. This can be changed
                */}
                {errors.email && (<FormError errorMsg='This field is required' />)}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword" className='signin sub-header'>
                Password
                <br />
                <input
                  id="inputPassword"
                  className="form-control textbox"
                  type="password"
                  placeholder="Password"

                  name="password"
                  {...register('password', { required: true })}
                />
                {errors.password && (<FormError errorMsg='This field is required' />)}
                {/* This error is required to be passed back from the server. */}
                {(errorInfo === 401) && (<FormError errorMsg='Invalid email/password combination. Please try again.' />)}
              </label>
            </div>
          </div>



          <div className='btn-container'>
            {button}
          </div>

          <p>
            Haven't signed in before? <NavLink to="/signup">Create an Account.</NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignInPage;