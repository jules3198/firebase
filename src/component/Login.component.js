import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import validator from 'validator';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from '../Services/Connection';
 

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!validator.isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        console.log("props 1 ", props);
        this.state= {
            email: "",
            password: "",
            loading: false,
            message: "",
            redirect: false,
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    async handleLogin(e){
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            login({email: this.state.email, password: this.state.password})
            this.setState({redirect: true});
            this.props.isLogin();
            console.log("redirect ", this.state)
        }else {
            this.setState({
                loading: false
            });
        }

    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/' />
          }
        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 card" style={{ padding: "5rem" }}>

                        <Form
                            onSubmit={(e)=>{this.handleLogin(e)}}
                            ref={c => {this.form = c;}}
                        >

                           
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e)=>{this.onChangeEmail(e)}}
                                    validations={[required, email]}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e)=>{this.onChangePassword(e)}}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>

                        <h5>Pas de compte ? <Link to="/register">créer un compte</Link> </h5>
                        </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            
        )
    }
}
export default LoginComponent;
