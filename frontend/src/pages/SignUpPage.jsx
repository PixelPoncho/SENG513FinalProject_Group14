// Importing Components from node_modules
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Import Local Components
import FormError from "../components/FormError";

// Importing icons
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

// importing styling
import '../styles/SignUpPage.scss';

function Login() {
  const [errorInfo, setErrorInfo] = useState("");
  const [credentials, setCredentials] = useState({});
  // Used to update button to inform user that their process is being processed
  const [isLoading, setIsLoading] = useState(false);
  // Used to change the content currently displayed on the screen
  const [isSuccessful, setIsSuccessful] = useState(false);

  // Arguments for react-hook-form
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    reValidateMode: 'onSubmit',
  });

  // used to compare passwords to make sure they match
  const password = useRef({});
  password.current = watch("password", "");

  // The handling of inputs & errors is done automatically through `react-hook-forms`
  const onSubmit = (data, e) => {
    e.target.reset();
    setErrorInfo('');
    setIsLoading(true);
    setCredentials(data);
  };

  const createUser = useCallback((data) => {
    return axios.post('/users/createuser', data);
  }, []);

  useEffect(() => {
    if (typeof credentials?.name === 'undefined') { return; }

    const accountData = {
      "user": {
        "username": credentials.name,
        "email": credentials.email,
        "password": credentials.password,
      },
    };

    createUser(accountData)
      .then(() => setIsSuccessful(true))
      .catch((err) => {
        setErrorInfo(err.response.status);
      });
    setIsLoading(false);

    // console.log("Send data to server ", credentials);
    setCredentials({});
  }, [credentials]);

  // Change the type of button on display based on if the user has submitted a request to create an account or not.
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
      Create an Account
    </button>;
  }

  // Actual login page content.
  return (
    <>
      {/* Constantly show regardless of current prompt on screen */}
      <div>
        <a href="/login">
          <BsFillArrowLeftCircleFill
            className='back-button'
            style={{
              margin: "15px",
              width: "50px",
              height: "50px",
              color: "var(--yellow)",
              borderRadius: "50px",
              boxShadow: "var(--card-shadow)",
            }}
            onMouseOver={({ target }) => {
              target.style.color = "var(--off-yellow)";
              target.style.cursor = "pointer";
            }}
            onMouseOut={({ target }) => {
              target.style.color = "var(--yellow)";
              target.style.cursor = "default";
            }}
          />
        </a>
      </div>

      {/* Display when the user has yet to successfully create an account within this instance */}
      {!isSuccessful &&
        <div className="signup --container">
          <h1 className="signup header">Sign Up</h1>

          {/* Login form */}

          <div className="signup-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                {/* FORM CHECK FOR INPUTTED NAME */}
                <label htmlFor="inputName" className='signup sub-header'>
                  Name *
                  <br />
                  <input
                    id="inputName"
                    className="form-control textbox"
                    type="name"
                    placeholder="e.g. John Doe"

                    name="name"
                    {...register('name', { required: true })}
                  />

                  {/*
                  If the criteria specified above in "register" is not satisfied, spawn an error message. As it is currently set up, regardless of the cause for the error, it will only spawn the single error message. This can be changed
                */}
                  {errors.name && (<FormError errorMsg='This field is required' />)}
                </label>
              </div>

              {/* FORM CHECK FOR INPUTTED EMAIL */}
              <div className="form-group">
                <label htmlFor="inputEmail" className='signup sub-header'>
                  Email *
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

              {/* FORM CHECK FOR INPUTTED PASSWORD */}
              <div className="form-group">
                <label htmlFor="inputPassword" className='signup sub-header'>
                  Password *
                  <br />
                  <input
                    id="inputPassword"
                    className="form-control textbox"
                    type="password"
                    placeholder="Password"

                    name="password"
                    {...register('password', {
                      required: "This field is required",
                      validate: (value) => {
                        return value === watch('password_repeat') || "The passwords do not match";
                      },
                    })}
                  />
                  {errors.password && (<FormError errorMsg={errors.password.message} />)}
                </label>
              </div>

              {/* FORM CHECK FOR RE-TYPED PASSWORD */}
              <div className="form-group last">
                <label htmlFor="inputRetypePassword" className='signup sub-header'>
                  Re-Type Password *
                  <br />
                  <input
                    id="inputRetypePassword"
                    className="form-control textbox"
                    type="password"
                    placeholder="Password"

                    name="password_repeat"
                    {...register('password_repeat', {
                      required: "This field is required",
                      validate: (value) => {
                        return value === watch('password') || "The passwords do not match";
                      },
                    })}
                  />
                  {errors.password_repeat && (<FormError errorMsg={errors.password_repeat.message} />)}
                </label>

                {/* An error message that can appear if the server was unable to successfully create their account (ie. something broke server wise). May need other errors to let them know if an email is already in use */}
                {(errorInfo) && (errorInfo === 400) && (
                  <FormError
                    className="account-creation--msg"
                    errorMsg={"Unable to create the account. Email already in use."}
                  // errorMsg='Unable to make the account. Please make sure all information is provided.'
                  />)
                }
              </div>

              <div className='btn-container'>
                {button}
              </div>

              <p className='small-text'>
                Already have an account? <NavLink to="/login">Sign In.</NavLink>
              </p>
            </form>
          </div>
        </div>
      }

      {/* Display when the user has successfully registered for an account */}
      {!isLoading && isSuccessful &&
        <div className='signup success --container'>
          <h1 className="signup header">You've successfully<br />registered!</h1>
          <p className='descriptive-text'>
            <b>
              Your account has been successfully created!
            </b>
          </p>

          <p className='descriptive-text'>
            You can now access the full extent of the features available for Educators in the virtual classroom, so why not explore right now!
          </p>

          <NavLink to="/login">
            <button className="--btn yellow solid">
              Sign In
            </button>
          </NavLink>
        </div>
      }
    </>
  );
}

export default Login;
