import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';

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
        },
        isSignup: true
    }

    componentDidUpdate() {
        if (this.props.isAuth) {
            this.props.history.push("/");
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

    authSwitchHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        })
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let errorMessage = null;
        let signUpMessage = null;

        if (this.state.isSignup && this.props.kind) {
            signUpMessage = <p className={classes.Auth__success} >Account created successfully!</p>;
        }

        if (this.props.error) {
            errorMessage = <p className={classes.Auth__error} >{this.props.error.replace(/_/g, ' ')}</p>;
        }

        let form = (
            <form onSubmit={this.formSubmitHandler} >
                <h2 style={{ 'color': '#703B09' }} >{this.state.isSignup ? "Signup to order!" : "Please login with your credentials"}</h2>
                {formElementsArray.map(element => (
                    <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} touched={element.config.touched} />
                ))}
                {errorMessage}
                {signUpMessage}

                <Button btnType="Success" >SUBMIT</Button>
                <Button btnType="Danger" clicked={this.authSwitchHandler} >{this.state.isSignup ? 'SWITCH TO SIGNIN' : 'SWITCH TO SIGNUP'}</Button>

            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Auth} >
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        kind: state.auth.kind,
        isAuth: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);