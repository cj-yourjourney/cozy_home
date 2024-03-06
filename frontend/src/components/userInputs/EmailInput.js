import React from "react";
import { Form } from "react-bootstrap";

const EmailInput = ({ email, setEmail }) => {
  return (
    <Form.Group controlId="email" className="py-2">
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Form.Group>
  );
};

export default EmailInput;
