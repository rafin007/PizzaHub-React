import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            email: {
                ...this.inputConfig('input', 'email', 'Your Email')
            },
            password: {
                ...this.inputConfig('input', 'password', 'Your Password')
            }
        }
    }

    inputConfig(elType, type, placeholder) {
        return {
            elementType: elType,
            elementConfig: {
                type,
                placeholder
            },
            value: '',
            rules: {
                required: true,
                minLength: type === 'password' ? 6 : null,
                isEmail: type === 'email' ? true : false
            },
            valid: false,
            touched: false
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].rules)
            }
        }
        this.setState({ controls: updatedControls });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.formSubmitHandler} >
                <h2>Please login with your credentials</h2>
                {formElementsArray.map(element => (
                    <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} touched={element.config.touched} />
                ))}

                <Button btnType="Success" >LOGIN</Button>

            </form>
        );

        return (
            <div className={classes.Auth} >
                {form}
            </div>
        );
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapPropsToDispatch)(Auth);