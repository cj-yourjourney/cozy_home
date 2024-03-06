import React from "react";
import { Form } from "react-bootstrap";

const PasswordInput = ({ password, setPassword }) => {
  return (
    <Form.Group controlId="password" className="py-2">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Form.Group>
  );
};

export default PasswordInput;
