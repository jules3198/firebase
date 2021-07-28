import React from 'react';
import NewFileComponent from '../Form.component';

export default function Modal ({show, title, disabled}) {
    // The Modal -->
    return (

        show && (
        <div className="pmodal-overlay">
        <div className="pmodal-wrapper">
        <div className="pmodal">
            <div className="pmodal-header">
                <p> {title}</p>
                <button
                    type="button"
                    className="pmodal-close-button"
                    onClick={disabled}
                >
                    <span>&times;</span>
                </button>
            </div>
            <div className="pmodal-body">
                    <NewFileComponent />
            </div>
        </div>
        </div>
    </div>   
    ));
  
}