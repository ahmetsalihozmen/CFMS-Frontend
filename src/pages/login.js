import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import MainLayout from "../components/layouts/MainLayout";
import { useInputHandling } from "../hooks";
import { LOGIN_URL } from "../utils/constants";

export default function Login() {
  const [inputs, handleInputChange] = useInputHandling();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, inputs, { "Content-Type": "application/json" });
      console.log(response);
      const { jwt } = response?.data?.data;
      localStorage.setItem("access_token", jwt);
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <Row className="justify-content-center pt-4">
        <Col xs={12} sm={9} md={6} lg={4}>
          <h1 className="text-center">LOGIN</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                id="username"
                placeholder="Username"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button type="submit" color="primary" className="w-100 mt-3" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" role="status" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </MainLayout>
  );
}
