import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex ms-auto my-2">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Button type='button' variant="primary" className="m-2">Add Note</Button>
                    <Button type='button' variant="danger" className="m-2"><Link to="/auth" className='text-decoration-none text-white'>Logout</Link></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;