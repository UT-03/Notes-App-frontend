import React from 'react';
import Modal from 'react-bootstrap/Modal';

const NoteModal = (props) => {
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
                {props.children}
            </Modal.Body>
        </Modal>
    );
};

export default NoteModal;