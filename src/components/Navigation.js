import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { parseJwt } from "../utils";
import { LOGOUT_URL } from "../utils/constants";

export default function Navigation() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = parseJwt(token);
    setName(user ? `${user.first_name} ${user.last_name}` : "Profile");
  }, []);

  const logout = async () => {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    };
    await axios.get(LOGOUT_URL, options);
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">CFMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ms-auto">
            <NavDropdown title={name} id="profile-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
