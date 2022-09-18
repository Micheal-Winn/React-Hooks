import React, { useState, useEffect ,useReducer ,useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,actions) => {
  if(actions.type === "USER_INPUT"){
    return {value : actions.val , isValid : actions.val.includes('@')}
  }
  if(actions.type === "INPUT_BLUR") {
    return {value : state.value , isValid : state.value.includes('@')}
  }
  return {val : '', isValid : false}
}

const passwordReducer = (state,actions) => {
  if(actions.type === "USER_INPUT"){
    return {value : actions.val , isValid : actions.val.trim().length > 6}
  }
  if(actions.type === "INPUT_BLUR") {
    return {value : state.value , isValid : state.value.trim().length > 6}
  }
  return {val : '', isValid : false}
}
const Login = (props) => {
  const authctx = useContext(AuthContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    val : '',
    isValid : null,
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val : '',
    isValid : null,
  })

  const {isValid : emailIsValid} = emailState;
  const {isValid : passwordIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type : "USER_INPUT", val : event.target.value})

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : "USER_INPUT", val : event.target.value})

    // setFormIsValid(
    //   enteredEmail.includes('@') && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authctx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus();
    }else{
      passwordInputRef.current.focus()
    }
    
  };



  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
        isValid={emailIsValid}
        id='email'
        label='E-Mail'
        type='text'
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        <Input
        ref={passwordInputRef}
        isValid={passwordIsValid}
        id='password'
        label='Password'
        type='password'
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
