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
import envVariables from '../environmentVariables';

const Home = (props) => {
    let searchQuery = '';
    const [notes, setNotes] = useState();
    const [notesToBeDisplayed, setNotesToBeDisplayed] = useState();

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchNotes = async () => {
            let responseData;
            try {
                responseData = await sendRequest(
                    `${envVariables.hostname}/api/notes/`,
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

    useEffect(() => {
        searchTagsHandler(searchQuery);
    }, [notes]);

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
        const notes$ = [...notes];

        setNotes(() => notes$.filter(note => note.id !== data));
    }

    const searchTagsHandler = (searchQuery$) => {
        searchQuery = searchQuery$;
        if (!notes)
            return;

        const notesToBeDisplayed$ = notes.filter(note => {
            let isValid = false;
            note.tags.forEach(tag => {
                if (tag.toLowerCase().includes(`${searchQuery}`.toLowerCase())) {
                    isValid = true;
                }
            });
            return isValid;
        })
        setNotesToBeDisplayed(() => notesToBeDisplayed$);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <Header
                onNewNote={newNoteAddedHandler}
                onTagsSearch={searchTagsHandler} />
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
                                <h3>Add Notes to see...</h3>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
            )
            }
            {!isLoading && notes && notesToBeDisplayed && notes.length !== 0 && (
                <Notes
                    error={error}
                    clearError={clearError}
                    notes={notesToBeDisplayed}
                    onEditNote={noteEditedHandler}
                    onDeleteNote={deletedNoteHandler} />
            )}
        </React.Fragment>
    );
};

export default Home;