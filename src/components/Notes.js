import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Note from './Note';
import { useForm } from '../hooks/FormHook';
import NoteFormModal from './NoteFormModal';
import WarningModal from './WarningModal';
import NoteBodyModal from './NoteBodyModal';
import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../util/authContext';
import noNoteIllustration from '../assets/images/noNoteIllustration.svg';
import ErrorModal from './ErrorModal';

const Notes = () => {
    const [notes, setNotes] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showNoteBodyModal, setShowNoteBodyModal] = useState(false);
    const [data, setData] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchNotes = async () => {
            let responseData;
            try {
                responseData = await sendRequest(
                    `${process.env.REACT_APP_HOSTNAME}/api/notes/`,
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setNotes(responseData.notes);
            } catch (err) {
                console.log(err);
            }
        }
        fetchNotes();
    }, [sendRequest]);

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

    const editNoteModalHandler = (data) => {
        setData(data);
        setFormData({
            heading: {
                value: data.heading,
                isValid: true
            },
            tags: {
                value: data.tags,
                isValid: true
            },
            body: {
                value: data.body,
                isValid: true
            }
        }, true)

        setShowModal(true);
    }

    const editNoteHandler = async (event, data) => {
        event.preventDefault();
        console.log(data);
    }

    const deleteNoteWarningModalHandler = () => {
        setShowWarningModal(true);
    }

    const deleteNoteHandler = () => {
        setShowWarningModal(false);
        console.log("Note deleted");
    }

    const showNoteBodyHandler = (data) => {
        console.log(data);
        setData(data);
        setShowNoteBodyModal(true);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onHide={clearError} show={!!error} />
            {!isLoading && notes && (
                <Container fluid="sm" className="mt-3">
                    {notes.length === 0 && (
                        <React.Fragment>
                            <Row>
                                <Col><Image src={noNoteIllustration} style={{ width: "30vw" }} className="d-block m-auto" /></Col>
                                <Col className="d-flex align-items-center">
                                    <div>
                                        <h1>Your Notes will appear here</h1>
                                        <h3>Add Notes to see here...</h3>
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )
                    }
                    {notes.length !== 0 && notes.map((note, index) => {
                        return <Note
                            note={note}
                            key={index}
                            onEditNoteClick={editNoteModalHandler}
                            onDeleteNoteClick={deleteNoteWarningModalHandler}
                            showNoteBodyHandler={showNoteBodyHandler} />
                    })}
                </Container>
            )}
            <NoteFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                submitHandler={editNoteHandler}
                title="Edit Note"
                formState={formState}
                inputHandler={inputHandler}
                data={data}
                buttonLabel="Edit Note"
            />
            <WarningModal
                show={showWarningModal}
                onHide={() => setShowWarningModal(false)}
                heading="Delete Note?"
                warningMessage="Are you sure you want to delete the note?"
                warningAssentButtonLabel="Delete"
                warningAssentHandler={deleteNoteHandler} />

            {showNoteBodyModal && data && (
                <NoteBodyModal
                    show={showNoteBodyModal}
                    onHide={() => setShowNoteBodyModal(false)}
                    data={data} />
            )}
        </React.Fragment>
    );
};

export default Notes;