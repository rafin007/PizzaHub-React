import React, { Component } from 'react';
import classes from './Auth.scss';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';

import { checkValidity } from '../Validation/Validation';

import { Link } from 'react-router-dom';

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
        isSignup: false,
        message: ''
    }

    componentDidUpdate() {
        if (this.props.isAuth) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        if (this.props.kind) {
            this.setState({ message: 'Account created successfully! Please login' });
            this.props.clearSignupKind();
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
                valid: checkValidity(event.target.value, this.state.controls[controlName].rules)
            }
        }
        this.setState({ controls: updatedControls });
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

        let errorMessage = null

        if (this.props.error) {
            errorMessage = <p className={classes.Auth__error} >{this.props.error.replace(/_/g, ' ')}</p>;
        }

        let form = (
            <form onSubmit={this.formSubmitHandler} >
                <h2 style={{ 'color': '#703B09' }} >Login with your credentials</h2>
                {formElementsArray.map(element => (
                    <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} touched={element.config.touched} />
                ))}

                {errorMessage}
                <p className={classes.Auth__success} >{this.state.message}</p>

                <Button btnType="Success" >SUBMIT</Button>

            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Auth} >
                {form}
                {/* <Button btnType="Danger" clicked={this.props.history.push('/signup')} >Don't have an account? Create one</Button> */}
                <p className={classes.SwitchLink} >
                    Don't have an account?
                    <Link to="/signup" >Create one</Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken,
        kind: state.auth.kind
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        clearSignupKind: () => dispatch(actions.clearSignupKind())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);