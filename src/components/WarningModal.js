import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WarningModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.warningMessage}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-evenly">
                <Button variant="danger" onClick={props.warningAssentHandler}>{props.warningAssentButtonLabel}</Button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarningModal;