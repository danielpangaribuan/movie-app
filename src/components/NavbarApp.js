import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarApp() {

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    let keyword = document.getElementById('search-keyword').value.toLowerCase();
    let toggleNav = document.getElementsByClassName('navbar-toggler')[0];
    navigate('/search/' + keyword);
    document.getElementById('search-keyword').value = '';
    toggleNav.click()
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#" className="text-uppercase" onClick={ () => navigate('/') }>MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={ () => navigate('/') }>Home</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={ (e) => submitSearch(e) }>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="search-keyword"
            />
            <Button variant="outline-light" onClick={ (e) => submitSearch(e)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;