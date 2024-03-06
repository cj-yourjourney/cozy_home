import React from "react";
import { Form } from "react-bootstrap";

const UsernameInput = ({ username, setUsername }) => {
  return (
    <Form.Group controlId="username" className="py-2">
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </Form.Group>
  );
};

export default UsernameInput;
