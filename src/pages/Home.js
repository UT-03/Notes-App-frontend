import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import noNoteIllustration from '../assets/images/noNoteIllustration.svg'
import Header from '../components/Header';
import Notes from '../components/Notes';
import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../util/authContext';
import ErrorModal from '../components/ErrorModal';

const Home = (props) => {
    const [notes, setNotes] = useState();

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const newNoteAddedHandler = (data) => {
        const notes$ = [...notes];
        notes$.push(data.note);
        setNotes(() => notes$);
    }

    const noteEditedHandler = (data) => {
        const notes$ = [...notes];
        const editedNoteIndex = notes$.findIndex(note => note.id === data.id);
        const editedNote = notes$[editedNoteIndex];

        editedNote.heading = data.heading;
        editedNote.tags = data.tags;
        editedNote.body = data.body;

        notes$[editedNoteIndex] = editedNote;

        setNotes(() => notes$);
    }

    const deletedNoteHandler = data => {
        console.log(data);
        const notes$ = [...notes];

        setNotes(() => notes$.filter(note => note.id !== data));
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <Header
                onNewNote={newNoteAddedHandler} />
            {isLoading && (
                <Container>
                    <Spinner animation="border" variant="primary" size='lg' style={{ width: "100px", height: "100px" }} className="mt-5 d-block m-auto" />
                </Container>
            )}
            {!isLoading && notes && notes.length === 0 && (
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
            {!isLoading && notes && notes.length !== 0 && (
                <Notes
                    error={error}
                    clearError={clearError}
                    notes={notes}
                    onEditNote={noteEditedHandler}
                    onDeleteNote={deletedNoteHandler} />
            )}
        </React.Fragment>
    );
};

export default Home;