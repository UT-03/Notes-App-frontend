import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../util/authContext';
import { useHttpClient } from '../hooks/HttpHook';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal';
import envVariables from '../environmentVariables';

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();

    const submitHandler = async (e, data, isLoginMode) => {
        e.preventDefault();
        let responseData;
        if (isLoginMode) {
            try {
                responseData = await sendRequest(
                    `${envVariables.hostname}/api/user/login`,
                    'POST',
                    JSON.stringify({
                        username: data.username,
                        password: data.password
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            }
            catch (err) {
                console.log(err);
            }
        } else {
            try {
                responseData = await sendRequest(
                    `${envVariables.hostname}/api/user/signup`,
                    'POST',
                    JSON.stringify({
                        username: data.username,
                        password: data.password
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            }
            catch (err) {
                console.log(err);
            }

        }
        auth.login(responseData.token);
        navigate('/');
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onHide={clearError} show={!!error} />
            <Container className="d-flex justify-content-center mt-5">
                <Card
                    style={{ width: '18rem' }}
                    className="my-auto"
                >
                    <Card.Body>
                        <Card.Title>Login Required</Card.Title>
                        <AuthForm
                            isLoading={isLoading}
                            onSubmit={submitHandler} />
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default Auth;