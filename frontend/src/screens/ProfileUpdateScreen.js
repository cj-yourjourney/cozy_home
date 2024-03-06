import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Row, Col, Form, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/userInputs/SubmitButton";
import FormContainer from "../components/FormContainer";
import UsernameInput from "../components/userInputs/UsernameInput";
import EmailInput from "../components/userInputs/EmailInput";
function ProfileUpdateScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch(getUserDetails("profile"));

        // Reset the success message after 5 seconds
        setTimeout(() => {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }, 5000);
      } else {
        setUsername(user.username);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        username: username,
        email: email,
      })
    );
  };

  useEffect(() => {
    if (success) {
      // Display success message for a few seconds before redirecting
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    }
  }, [success, navigate]);

  return (
    <FormContainer>
      <Card>
        <Card.Body>
          <h2>User Profile Form</h2>
          {success && (
            <Alert variant="success">
              User info updated successfully! Redirecting to profile page...
            </Alert>
          )}
          {error && <Message error={error} />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <UsernameInput username={username} setUsername={setUsername} />
            <EmailInput email={email} setEmail={setEmail} />
            <SubmitButton label="Update Info" />
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
}

export default ProfileUpdateScreen;
