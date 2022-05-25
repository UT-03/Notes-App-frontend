import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

import editNoteImage from '../assets/images/editNote.svg';
import deleteNoteImage from '../assets/images/deleteNote.svg';

const DUMMY_NOTES = [
    {
        heading: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        tags: ["lorem", "ipsum", "dolor"],
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
    },
    {
        heading: "Lorem ipsum dolor sit amet",
        tags: ["lorem", "ipsum", "dolor"],
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
    },
    {
        heading: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, consectetur adipisicing elit.",
        tags: ["lorem", "ipsum", "dolor", "amet", "consectetur"],
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
    },
]

const Notes = (props) => {

    return (
        <Container fluid="sm" className="mt-3">
            {DUMMY_NOTES.map((note, index) => {
                return (
                    <Row className="border rounded p-3 my-2" style={{ cursor: "pointer" }} key={index}>
                        <Col xs={9} sm={10} lg={11}>
                            <Row>{note.heading}</Row>
                            <div>
                                {note.tags.map((tag, index) => <Badge bg="primary" className="mx-1" key={index}>{tag}</Badge>)}
                            </div>
                        </Col>
                        <Col xs={3} sm={2} lg={1} className=" p-0 d-flex flex-row align-items-center flex-wrap justify-content-evenly">
                            <Image src={editNoteImage} style={{ height: "1.75rem", filter: "invert(30%) sepia(99%) saturate(1447%) hue-rotate(203deg) brightness(97%) contrast(113%)" }} />
                            <Image src={deleteNoteImage} style={{ height: "1.75rem", filter: "invert(30%) sepia(63%) saturate(3077%) hue-rotate(336deg) brightness(89%) contrast(92%)" }} />
                        </Col>
                    </Row>
                )
            })}
        </Container>
    );
};

export default Notes;