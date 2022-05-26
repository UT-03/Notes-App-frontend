import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import AuthForm from '../components/AuthForm';


const Auth = (props) => {


    const submitHandler = (e, data, isLoginMode) => {
        e.preventDefault();
        console.log(data)
        console.log(isLoginMode)
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card
                style={{ width: '18rem' }}
                className="my-auto"
            >
                <Card.Body>
                    <Card.Title>Login Required</Card.Title>
                    {/* <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text> */}
                    <AuthForm
                        onSubmit={submitHandler} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Auth;