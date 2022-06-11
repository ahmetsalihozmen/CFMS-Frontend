import Link from "next/link";
import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";

const _500 = () => {
  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col className="text-center">
          <h1>
            <Badge bg="danger">500</Badge>
          </h1>
          <h1>Internal Server Error</h1>
          <Link href="/">
            <a>Click here to go to main page.</a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default _500;
