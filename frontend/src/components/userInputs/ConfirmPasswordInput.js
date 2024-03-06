import React from "react";
import { Form } from "react-bootstrap";

const ConfirmPasswordInput = ({ confirmPassword, setConfirmPassword }) => {
  return (
    <Form.Group controlId="confirmPassword" className="py-2">
      <Form.Label>Confirm Password:</Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </Form.Group>
  );
};

export default ConfirmPasswordInput;
