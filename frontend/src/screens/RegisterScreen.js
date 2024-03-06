import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SubmitButton from "../components/userInputs/SubmitButton";
import UsernameInput from "../components/userInputs/UsernameInput";
import EmailInput from "../components/userInputs/EmailInput";
import PasswordInput from "../components/userInputs/PasswordInput";
import ConfirmPasswordInput from "../components/userInputs/ConfirmPasswordInput";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router's navigate function

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // Redirect after successful registration
  useEffect(() => {
    if (userInfo) {
      // If userInfo is available (registration successful), navigate to the previous page
      navigate(-1);
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(username, email, password));
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <FormContainer>
      <h2>User Register</h2>
      {loading && <Loader />}
      {userInfo && <p>Registration successful!</p>}
      {error && <Message variant="danger">{error}</Message>}
      {passwordMatch === false && (
        <Message variant="danger">Passwords do not match</Message>
      )}
      <Form onSubmit={submitHandler}>
        <UsernameInput username={username} setUsername={setUsername} />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <ConfirmPasswordInput
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <br />
        <SubmitButton label="Register" />
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
