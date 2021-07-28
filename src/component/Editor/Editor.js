import React, { useState, useEffect } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { getmessages,updateMessages,firebase } from '../../Services/Connection'
import { useParams, Link } from "react-router-dom";


function Editor() {
  const [html, setHtml] = useState("");
  let { key } = useParams();
  console.log("key ", key);
  function onChange(e) {
    setHtml(e.target.value);
    console.log("editor ", html)
    updateMessages('/messages/'+ key, html);
}


useEffect(() =>{
    var messageData = firebase.database().ref('/messages/' + key);
    messageData.on('value', (message) => {
      const data = message.val();
      console.log("message  ", data.messages)
      setHtml(data.messages);
    });

    return () => messageData.off() ;
},[key])
  return (
      <div className="container-fluid">
          <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
              <div style={{float: 'left'}}>
                <Link to="/">retour à la liste</Link><br></br>
                <Link to={'/chat/'+key}>visiter le chat</Link>
              </div>
              <div style={{marginTop: "5rem"}}>
                <DefaultEditor value={html} onChange={onChange} />
              </div>
          </div>
          <div className="col-md-1"></div>
          </div>
          
      </div>
    
  );
}


export default Editor;