import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useInputHandling } from "../../hooks";

export default function SendMessageInput({ sendMessage }) {
  const [inputs, handleInputChange, setInputs] = useInputHandling({ message: "" });

  const submit = e => {
    e.preventDefault();
    const { message } = inputs;
    if (!message) return console.log("Error sending message!"); // TODO Handle error
    sendMessage(message);
    setInputs({ message: "" });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control
            type="text"
            name="message"
            value={inputs.message}
            placeholder="Type a message..."
            onChange={handleInputChange}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" onClick={submit}>
            Send
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
