import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators'
import Input from '../util/Input';

const NoteFormModal = (props) => {
    const isEdit = !!props.data;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="noteModal"
            centered
            scrollable
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton>
                <Modal.Title id="noteModal">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => props.submitHandler(e, {
                    heading: props.formState.inputs.heading.value,
                    tags: props.formState.inputs.tags.value,
                    body: props.formState.inputs.body.value
                })}>
                    <Input
                        element="input"
                        id="heading"
                        type="text"
                        label="Heading"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid Heading!"
                        onInput={props.inputHandler}
                        initialValue={isEdit ? props.data.heading : ''}
                        initialValid={isEdit ? true : false}
                    />
                    <Input
                        element="input"
                        id="tags"
                        type="text"
                        label="Tags"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid Tags!"
                        onInput={props.inputHandler}
                        initialValue={isEdit ? props.data.tags : ''}
                        initialValid={isEdit ? true : false}
                    />
                    <Input
                        id="body"
                        type="text"
                        label="Body"
                        rows={10}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                        errorText="Body must have minimum length of 10 characters!"
                        onInput={props.inputHandler}
                        initialValue={isEdit ? props.data.body : ''}
                        initialValid={isEdit ? true : false}
                    />
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={!props.formState.isValid || props.buttonDisable}>
                        {props.buttonDisable && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        {props.buttonLabel}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NoteFormModal;