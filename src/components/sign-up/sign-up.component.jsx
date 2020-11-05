import React from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        };

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <div className='group'>
                        <input
                            className='form-input'
                            name='displayName'
                            value={displayName}
                            onChange={this.handleChange}
                            required />
                        <label
                            className={`${this.state.displayName.length ? 'shrink' : ''
                                } form-input-label`}
                        > Display Name </label>
                    </div>
                    <div className='group'>
                        <input
                            className='form-input'
                            name='email'
                            type='email'
                            value={email}
                            onChange={this.handleChange}
                            required />
                        <label
                            className={`${this.state.email.length ? 'shrink' : ''
                                } form-input-label`}
                        > Email </label>
                    </div>
                    <div className='group'>
                        <input
                            className='form-input'
                            name='password'
                            type='password'
                            value={password}
                            onChange={this.handleChange}
                            required />
                        <label
                            className={`${this.state.password.length ? 'shrink' : ''
                                } form-input-label`}
                        > Password </label>
                    </div>
                    <div className='group'>
                        <input
                            className='form-input'
                            name='confirmPassword'
                            type='password'
                            value={confirmPassword}
                            onChange={this.handleChange}
                            required />
                        <label
                            className={`${this.state.confirmPassword.length ? 'shrink' : ''
                                } form-input-label`}
                        > Confirm Password </label>
                    </div>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    };
};

export default SignUp;