import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import EmailInput from "../components/userInputs/EmailInput";
import PasswordInput from "../components/userInputs/PasswordInput";
import SubmitButton from "../components/userInputs/SubmitButton";

function LoginScreen() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router's navigate function

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // If userInfo is available (login successful), navigate to the previous page
      navigate(-1);
    }
  }, [navigate, userInfo]);

  const logoutHandler = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h2>Login</h2>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <EmailInput email={email} setEmail={setEmail} />

        <PasswordInput password={password} setPassword={setPassword} />

        <SubmitButton label="Login" />
      </Form>

      {loading && <Loader />}

      {!userInfo && (
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register/">Register</Link>
          </Col>
        </Row>
      )}

      {userInfo && (
        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      )}
    </FormContainer>
  );
}

export default LoginScreen;
