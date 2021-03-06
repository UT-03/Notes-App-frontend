import React, { useReducer, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { validate } from './validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            };
        }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const isInputInvalid = !inputState.isValid && inputState.isTouched;

    const element = props.element === 'input' ? (
        <Form.Group className='mb-3'>
            <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
            <Form.Control
                className={`${isInputInvalid && "invalid border border-danger"}`}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value} />
            {!inputState.isValid && inputState.isTouched && (
                <Form.Text className="text-danger d-block">{props.errorText}</Form.Text>
            )}
            <Form.Text className="text-muted">{props.extraText}</Form.Text>

        </Form.Group>
    ) : (
        <Form.Group className='mb-3'>
            <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
            <Form.Control
                className={`${isInputInvalid && "invalid border border-danger"}`}
                as="textarea"
                id={props.id}
                rows={props.rows || 3}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value} />
            {!inputState.isValid && inputState.isTouched && (
                <Form.Text className="text-danger d-block">{props.errorText}</Form.Text>
            )}
            <Form.Text className="text-muted">{props.extraText}</Form.Text>
        </Form.Group>
    );
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
}

export default Input;