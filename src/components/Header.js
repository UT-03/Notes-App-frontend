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
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from './ErrorModal';
import envVariables from '../environmentVariables';

const Header = props => {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutWarningModal, setShowLogoutWarningModal] = useState(false);

    const auth = useAuth(AuthContext);
    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

        return sendRequest(
            `${envVariables.hostname}/api/notes/add-new-note`,
            'POST',
            JSON.stringify({
                heading: data.heading,
                tags: data.tags,
                body: data.body
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        )
            .then(responseData => {
                props.onNewNote(responseData);
            })
            .then(() => {
                setShowModal(false);
            });
    }

    const logoutHandler = () => {
        auth.logout();
        navigate('/auth');
    }
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container fluid>
                    <Navbar.Brand href="#">Notes App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form
                            className="d-flex ms-auto my-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <FormControl
                                type="search"
                                placeholder="Search tags"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => props.onTagsSearch(e.target.value)}
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
                buttonDisable={isLoading}
            />
            <WarningModal
                show={showLogoutWarningModal}
                onHide={() => setShowLogoutWarningModal(false)}
                heading="Logout?"
                warningMessage="Are you sure you want to logout?"
                warningAssentButtonLabel="Logout"
                warningAssentHandler={logoutHandler} />
            <ErrorModal
                error={error}
                show={!!error}
                onHide={clearError} />
        </React.Fragment>
    );
};

export default Header;