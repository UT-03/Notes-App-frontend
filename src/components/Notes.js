import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Note from './Note';
import { useForm } from '../hooks/FormHook';
import NoteFormModal from './NoteFormModal';

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
    const [showModal, setShowModal] = useState(false);
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

    return (
        <React.Fragment>
            <Container fluid="sm" className="mt-3">
                {DUMMY_NOTES.map((note, index) => {
                    return <Note note={note} key={index} onEditNoteClick={editNoteModalHandler} />
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
        </React.Fragment>
    );
};

export default Notes;