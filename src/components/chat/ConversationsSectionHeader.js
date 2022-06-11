import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function ConversationsSectionHeader() {
  return (
    <>
      <Row>
        <Col>
          <h3>Conversations</h3>
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
