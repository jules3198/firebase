import React, { Component } from 'react';
import validator from 'validator';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Redirect,Link} from 'react-router-dom';
import { createUser } from '../Services/Connection';


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const password = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
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

class RegisterComponent extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstname: '',
            lastname: '',
            successful: false,
            message: "",
            redirect: false
        };
    }

    onChangeFirstname(e) { 
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
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


    async handleRegister(e) {
        e.preventDefault();
        console.log("state ", this.state)
        let user = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
        }
        createUser(user)
            this.setState({redirect: true})
    }


    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/login' />
          }
       return (
           
           <div className="container-fluid">
               <div className="row">
                   <div className="col-md-4"></div>
                   <div className="col-md-4 card" style={{ paddingTop: "3rem", paddingBottom: "3rem"}}>
                   <Form
                   onSubmit={(e) => { this.handleRegister(e) }}
                   ref={c => {
                       this.form = c;
                   }}
               >
                   {!this.state.successful && (
                       <div>
                          
                          <div className="form-group">
                                <label htmlFor="email">Lastname</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="text"
                                    value={this.state.lastname}
                                    onChange={(e)=>{this.onChangeLastname(e)}}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="email">Firstname</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="text"
                                    value={this.state.firstname}
                                    onChange={(e)=>{this.onChangeFirstname(e)}}
                                />
                            </div>

                           <div className="form-group">
                               <label htmlFor="email">Email</label>
                               <Input
                                   type="text"
                                   className="form-control"
                                   name="email"
                                   value={this.state.email}
                                   onChange={(e) => { this.onChangeEmail(e) }}
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
                                   onChange={ (e) => { this.onChangePassword(e) }}
                                   validations={[required, password]}
                               />
                           </div>
                           

                           <div className="form-group">
                               <button className="btn btn-primary btn-block">Sign Up</button>
                           </div>
                       </div>
                   )}

                   {this.state.message && (
                       <div className="form-group">
                           <div
                               className={
                                   this.state.successful
                                       ? "alert alert-success"
                                       : "alert alert-danger"
                               }
                               role="alert"
                           >
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

               <h5>déja un compte  ? <Link to="/">se connecter</Link> </h5>
                   </div>
                   <div className="col-md-4"></div>
               </div>
           </div>
       )
    }
}

export  default RegisterComponent;