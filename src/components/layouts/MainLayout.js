import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../Navigation";

export default function MainLayout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col className="m-0 p-0">
          <Navigation />
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
