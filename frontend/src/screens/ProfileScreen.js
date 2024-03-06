import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SubmitButton from "../components/userInputs/SubmitButton";


function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      // Redirect to login if the user is not logged in
      navigate("/login");
    } else {
      dispatch(getUserDetails("profile"));
    }
  }, [dispatch, navigate, userInfo]);

  console.log(user);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>User Profile</h2>
          {loading && <Loader />}
          {error && <Message error={error} />}
          {user && (
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.email}
                </Card.Subtitle>
                {/* Include other user details here */}
                <Link to="/profile/update/">
                  < SubmitButton label="Update Profile" /> 
                </Link>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
