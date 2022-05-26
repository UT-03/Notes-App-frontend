import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../util/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';
import { useForm } from '../hooks/FormHook';

const AuthForm = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler] = useForm({
        username: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    return (
        <Form
            onSubmit={(e) => props.onSubmit(e, {
                username: formState.inputs.username.value,
                password: formState.inputs.password.value
            }, isLoginMode)}
        >
            <Input
                element="input"
                id="username"
                type="text"
                label="Username"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid Username!"
                onInput={inputHandler}
            />
            <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                errorText="Password must be at least of 6 characters!"
                onInput={inputHandler}
            />
            <Button
                type='submit'
                variant='primary'
                className="d-block mx-auto"
                disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
            <Button
                type='button'
                variant='outline-primary'
                className="d-block mx-auto mt-2"
                onClick={() => setIsLoginMode(value => !value)}
            >Switch to {!isLoginMode ? "LOGIN" : "SIGNUP"}</Button>

        </Form>
    );
};

export default AuthForm;