import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

import editNoteImage from '../assets/images/editNote.svg';
import deleteNoteImage from '../assets/images/deleteNote.svg';

const Note = (props) => {
    return (
        <Row
            className="border rounded p-3 my-2"
            style={{ userSelect: "none" }}
        >
            <Col xs={9} sm={10} lg={11}
                style={{ cursor: "pointer" }}
                onClick={() => props.showNoteBodyHandler(props.note)}>
                <Row>{props.note.heading}</Row>
                <div>
                    {props.note.tags.map((tag, index) => <Badge bg="primary" className="mx-1" key={index}>{tag}</Badge>)}
                </div>
            </Col>
            <Col xs={3} sm={2} lg={1} className=" p-0 d-flex flex-row align-items-center flex-wrap justify-content-evenly">
                <Image
                    src={editNoteImage}
                    style={{
                        cursor: "pointer",
                        height: "1.75rem",
                        filter: "invert(30%) sepia(99%) saturate(1447%) hue-rotate(203deg) brightness(97%) contrast(113%)"
                    }}
                    onClick={() => props.onEditNoteClick({
                        id: props.note.id,
                        heading: props.note.heading,
                        tags: props.note.tags.join(", "),
                        body: props.note.body
                    })} />
                <Image
                    src={deleteNoteImage}
                    style={{
                        cursor: "pointer",
                        height: "1.75rem",
                        filter: "invert(30%) sepia(63%) saturate(3077%) hue-rotate(336deg) brightness(89%) contrast(92%)"
                    }}
                    onClick={() => props.onDeleteNoteClick({
                        id: props.note.id
                    })} />
            </Col>
        </Row>
    );
};

export default Note;