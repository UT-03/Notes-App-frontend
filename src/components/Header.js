import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NoteModal from './NoteModal';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators'
import Input from '../util/Input';
import { useForm } from '../hooks/FormHook';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [formState, inputHandler, setFormData] = useForm({
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

    const newNoteHandler = async event => {
        event.preventDefault();
        const data = {
            heading: formState.inputs.heading.value,
            tags: formState.inputs.tags.value,
            body: formState.inputs.body.value
        }

        console.log(data);
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
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Button type='button' variant="primary" className="m-2" onClick={() => setShowModal(true)}>Add Note</Button>
                        <Button type='button' variant="danger" className="m-2"><Link to="/auth" className='text-decoration-none text-white'>Logout</Link></Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <NoteModal show={showModal} onHide={() => setShowModal(false)} title="Add Note">
                <Form onSubmit={newNoteHandler}>
                    <Input
                        element="input"
                        id="heading"
                        type="text"
                        label="Heading"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid Heading!"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="tags"
                        type="text"
                        label="Tags"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid Tags!"
                        onInput={inputHandler}
                    />
                    <Input
                        id="body"
                        type="text"
                        label="Body"
                        rows={10}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                        errorText="Body must have minimum length of 10 characters!"
                        onInput={inputHandler}
                    />
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={!formState.isValid}>Add Note</Button>
                </Form>
            </NoteModal>
        </React.Fragment>
    );
};

export default Header;