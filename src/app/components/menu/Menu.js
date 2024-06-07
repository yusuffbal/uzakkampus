import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaBook, FaGraduationCap, FaEdit, FaUserCircle, FaCog, FaPowerOff, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux'; // Yeni eklenen import
import { logout } from '../../redux/auth/authSlice';

const Menu = () => {
  const dispatch = useDispatch(); // Yeni eklenen dispatch
  const customFontStyle = {
    fontFamily: 'Arial, sans-serif',
  };

  const handleLogout = () => {
    dispatch(logout()); // Redux'taki logout eylemini tetikle
    // Buraya kullanıcıyı çıkış yaptığına dair bir bildirim de ekleyebilirsiniz.
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/homepage" style={customFontStyle}>Uzak Kampüs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage" style={customFontStyle}>
              <FaHome className="mr-2" /> Ana Sayfa
            </Nav.Link>
            <NavDropdown title="İşlemler" id="collapsible-nav-dropdown" menuVariant="primary" style={customFontStyle}>
              <NavDropdown.Item href="/courses" style={customFontStyle}>
                <FaBook className="mr-2" /> Derslerim
              </NavDropdown.Item>
              <NavDropdown.Item href="/grading-system" style={customFontStyle}>
                <FaGraduationCap className="mr-2" /> Not Sistemi
              </NavDropdown.Item>
              <NavDropdown.Item href="/examination-system" style={customFontStyle}>
                <FaEdit className="mr-2" /> Sınav Sistemi
              </NavDropdown.Item>
              <NavDropdown.Item href="/forums" style={customFontStyle}>
                <FaUserCircle className="mr-2" /> Forumlar
              </NavDropdown.Item>
              <NavDropdown.Item href="/yonetim-paneli" style={customFontStyle}>
                <FaCog className="mr-2" /> Yönetim Paneli
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/profile" style={customFontStyle}>
              <FaUser className="mr-2" /> Profil
            </Nav.Link>
            <Nav.Link onClick={handleLogout} style={customFontStyle}> {/* Çıkış Yap düğmesine onClick eklenmiş */}
              <FaPowerOff className="mr-2" /> Çıkış Yap
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
