import React, {Component} from 'react';
import Modal from "./modal/Modal";
import { subscribeList } from "../Services/Connection"
import { Link } from "react-router-dom"
class ListComponent extends  Component{


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false
        }
    }


    async onDelete(id) {
        alert(id)
    }  

    

        render()
        {
            subscribeList('files', (files) => {
                this.state.data = files;
            })
            return (
                <div className="container-fluid" style={{ padding: "5rem"
                }}>
                    <div style={{ float: 'right'}} >
                        <button className="btn btn-primary" onClick={()=> {this.setState({isOpen : true});}} style={{ marginBottom: "3rem", width: "200px"}}>nouveau fichier</button>
                    </div>
                    <div className="container-fluid" style={{marginTop: "5rem"}}>
                         <div className="row">
                            {this.state.data.map((file => {
                                return(
                                
                                            <div style={{ float: 'left', width: "200px", marginLeft: '10px', backgroundColor: 'blue', color: 'white', paddingTop: '20px', borderRadius: '10px', paddingBottom: '20px', marginTop:'15px'}} >
                                                <h5>{file.values}</h5>
                                                <Link  style={{color: 'orange'}} to={"/editor/"+file.key} > editer</Link>
                                            </div>   
                                )
                            }))}
                     </div>
                                
                </div>
                    <Modal title="Nouveau fichier" show={this.state.isOpen} disabled={()=> {this.setState({isOpen: false})}} />
                </div>
            )
        }
    }

    export default ListComponent;




















