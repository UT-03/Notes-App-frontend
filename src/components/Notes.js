import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Note from './Note';
import { useForm } from '../hooks/FormHook';
import NoteFormModal from './NoteFormModal';
import WarningModal from './WarningModal';
import NoteBodyModal from './NoteBodyModal';
import ErrorModal from './ErrorModal';

const Notes = props => {

    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showNoteBodyModal, setShowNoteBodyModal] = useState(false);
    const [data, setData] = useState();

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
        setData(data);
        setShowNoteBodyModal(true);
    }

    return (
        <React.Fragment>
            <ErrorModal error={props.error} onHide={props.clearError} show={!!props.error} />
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