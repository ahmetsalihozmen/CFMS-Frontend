import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function ConversationsSectionHeader() {
  return (
    <>
      <Row>
        <Col>
          <h1>Conversations</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Control type="text" placeholder="Search" />
        </Col>
      </Row>
    </>
  );
}
