import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

const NoteBodyModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Here's your Note!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.data.heading}</h4>
                <p>
                    {props.data.tags.map((tag, index) => <Badge bg="primary" className="mx-1" key={index}>{tag}</Badge>)}
                </p>
                <p>
                    {props.data.body}
                </p>
            </Modal.Body>
        </Modal>
    );
};

export default NoteBodyModal;