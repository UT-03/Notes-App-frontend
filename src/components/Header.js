import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NoteFormModal from './NoteFormModal';
import WarningModal from './WarningModal';
import { useForm } from '../hooks/FormHook';
import { useAuth } from '../hooks/AuthHook';
import { AuthContext } from '../util/authContext';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutWarningModal, setShowLogoutWarningModal] = useState(false);

    const auth = useAuth(AuthContext);
    const navigate = useNavigate();

    const [formState, inputHandler] = useForm({
        heading: {
            value: '',
            isValid: false
        },
        tags: {
            value: '',
            isValid: false
        },
        body: {
            value: '',
            isValid: false
        }
    }, false);

    const newNoteHandler = async (event, data) => {
        event.preventDefault();

        console.log(data);
    }

    const logoutHandler = () => {
        auth.logout();
        navigate('/auth');
    }
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Notes App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-flex ms-auto my-2">
                            <FormControl
                                type="search"
                                placeholder="Search tags"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Button type='button' variant="primary" className="m-2" onClick={() => setShowModal(true)}>Add Note</Button>
                        <Button type='button' variant="danger" className="m-2" onClick={() => setShowLogoutWarningModal(true)}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <NoteFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                submitHandler={newNoteHandler}
                title="Add Note"
                formState={formState}
                inputHandler={inputHandler}
                buttonLabel="Add Note"
            />
            <WarningModal
                show={showLogoutWarningModal}
                onHide={() => setShowLogoutWarningModal(false)}
                heading="Logout?"
                warningMessage="Are you sure you want to logout?"
                warningAssentButtonLabel="Logout"
                warningAssentHandler={logoutHandler} />
        </React.Fragment>
    );
};

export default Header;