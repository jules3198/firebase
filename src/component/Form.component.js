import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { createFile } from '../Services/UserService'


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


class NewFileComponent extends  Component{


    constructor(props) {
        super(props);
        this.state= {
            filename: '',
        }
        
    }

    onChangeFilename(e) {
        this.setState({
            filename: e.target.value
        });
    }


    async handleSubmit(e) {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            console.log("form  ", this.state.filename)
            createFile(this.state.filename);
            this.state.filename = ""
        }

    }

    render() {
        return (
            <div className="container-fluid" style={{ padding: "5rem" }}>
                <div className="row">
                    <div className="col-md-12">
                          <Form
                    onSubmit={(e)=>{this.handleSubmit(e)}}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                    <label style={{ float: "left"}} htmlFor="filename">Nom du fichier</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="filename"
                                        value={this.state.filename}
                                        onChange={(e)=>{this.onChangeFilename(e)}}
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Ajouter</button>
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
                    </div>
                </div>
            </div>
        )
    }
}

export  default  NewFileComponent;