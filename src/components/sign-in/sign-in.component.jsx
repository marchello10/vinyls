import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({ email: '', password: '' });
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            alert(error.message);
        }
    };

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <div className='group'>
                        <input
                            className='form-input'
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        <label
                            className={`${this.state.email.length ? 'shrink' : ''
                                } form-input-label`}
                        > email </label>
                    </div>
                    <div className='group'>
                        <input
                            className='form-input'
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required />
                        <label
                            className={`${this.state.password.length ? 'shrink' : ''
                                } form-input-label`}
                        > password </label>
                    </div>
                    <div className='buttons'>
                        <CustomButton
                            type='submit'
                        >SIGN IN
                        </CustomButton>
                        <CustomButton 
                            type="button"
                            onClick={signInWithGoogle} isGoogleSignIn >
                            SIGN IN WITH GOOGLE
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
};

export default SignIn;