import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Note from './Note';
import { useForm } from '../hooks/FormHook';
import NoteFormModal from './NoteFormModal';
import WarningModal from './WarningModal';
import NoteBodyModal from './NoteBodyModal';
import ErrorModal from './ErrorModal';
import { AuthContext } from '../util/authContext';
import { useHttpClient } from '../hooks/HttpHook';
import noNoteIllustration from '../assets/images/noNoteIllustration.svg'
import envVariables from '../environmentVariables';

const Notes = props => {

    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showNoteBodyModal, setShowNoteBodyModal] = useState(false);
    const [data, setData] = useState();

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
        console.log(data)
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

        return sendRequest(
            `${envVariables.hostname}/api/notes/edit-note`,
            'PATCH',
            JSON.stringify({
                id: data.id,
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
                props.onEditNote(responseData.note);
            })
            .then(() => {
                setShowModal(false);
            });
    }

    const deleteNoteWarningModalHandler = (data) => {
        setData(data);
        setShowWarningModal(true);
    }

    const deleteNoteHandler = () => {
        return sendRequest(
            `${envVariables.hostname}/api/notes/`,
            'DELETE',
            JSON.stringify({
                id: data.id
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        )
            .then(() => {
                props.onDeleteNote(data.id);
            })
            .then(() => {
                setShowWarningModal(false);
            });
    }

    const showNoteBodyHandler = (data) => {
        setData(data);
        setShowNoteBodyModal(true);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onHide={clearError} show={!!error} />
            {props.notes.length !== 0 ?
                <Container fluid="sm" className="mt-3">
                    {props.notes.map((note, index) => {
                        return <Note
                            note={note}
                            key={index}
                            onEditNoteClick={editNoteModalHandler}
                            onDeleteNoteClick={deleteNoteWarningModalHandler}
                            showNoteBodyHandler={showNoteBodyHandler} />
                    })}
                </Container>
                :
                <React.Fragment>
                    <Row>
                        <Col><Image src={noNoteIllustration} style={{ width: "30vw" }} className="d-block m-auto" /></Col>
                        <Col className="d-flex align-items-center">
                            <div>
                                <h3>None of the notes match your search query</h3>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
            }
            <NoteFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                submitHandler={editNoteHandler}
                title="Edit Note"
                formState={formState}
                inputHandler={inputHandler}
                data={data}
                buttonLabel="Edit Note"
                buttonDisable={isLoading}
            />
            <WarningModal
                show={showWarningModal}
                onHide={() => setShowWarningModal(false)}
                heading="Delete Note?"
                warningMessage="Are you sure you want to delete the note?"
                warningAssentButtonLabel="Delete"
                warningAssentHandler={deleteNoteHandler}
                buttonDisable={isLoading} />

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