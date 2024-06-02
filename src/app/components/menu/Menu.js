import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaBook, FaGraduationCap, FaEdit, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
  const customFontStyle = {
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <Navbar collapseOnSelect expand="lg"  bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/homepage" style={customFontStyle}>Uzak Kampüs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage" style={customFontStyle}>
              <FaHome className="mr-2" /> Ana Sayfa
            </Nav.Link>
            <NavDropdown title="İşlemler" id="collapsible-nav-dropdown" menuVariant="dark" style={customFontStyle}>
              <NavDropdown.Item href="/grading-system" style={customFontStyle}>
                <FaGraduationCap className="mr-2" /> Not Sistemi
              </NavDropdown.Item>
              <NavDropdown.Item href="/my-lessons" style={customFontStyle}>
                <FaBook className="mr-2" /> Derslerim
              </NavDropdown.Item>
              <NavDropdown.Item href="/examination-system" style={customFontStyle}>
                <FaEdit className="mr-2" /> Sınav Sistemi
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/profile" style={customFontStyle}>
              <FaUser className="mr-2" /> Profil
            </Nav.Link>
            <Nav.Link href="/logout" style={customFontStyle}>
              <FaSignOutAlt className="mr-2" /> Çıkış Yap
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
