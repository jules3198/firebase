import React, { useState, useEffect } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { getmessages,updateMessages,firebase, subscribeList, pushData } from '../../Services/Connection'
import { useParams, Link } from "react-router-dom";


function Chat() {
  const [data, setDatas] = useState([]);
  const [content, setContent] = useState("")
  let { key } = useParams();
  const user = firebase.auth().currentUser;
  console.log("key ", key);

  function onChange(e) {
    setContent(e.target.value);
  }
  function onSend() {
    setContent("")
    if(content.replace(/ /g, "").length > 0) {
        pushData('/chats/'+key, {user: user.email, message: content});
    }
}


useEffect(() =>{
    var messageData = firebase.database().ref('/chats/' + key);
    subscribeList('/chats/'+key, (chats) => {
        let arr = [];
        chats.forEach(element => {
            console.log('chats ', element.values)
            arr.push(element.values)
        });

        setDatas(arr);
    })

    return () => messageData.off() ;
},[key])
  return (
      <div className="container-fluid">
          <div className="row" style={{marginBottom: '10px'}}>
              <div className="col-md-2"></div>
              <div className="col-md-8">
              <Link style={{float: 'left'}} to={'/editor/'+key}>Retour à l'éditeur</Link>
              </div>
              <div className="col-md-2"></div>
          </div>
          <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 card">
              <div style={{width: '100%', overflowY: 'auto', height: '700px', paddingBottom: '10px', paddingTop: '10px'}}>
                {data.map((message => {

                    if(message.user !== user.email) {
                    return(
                        <div style={{ float: 'right', width: "53%", marginTop:'15px', padding:'20px'}} >
                            <span style={{ float: 'right'}}> {message.user}</span> <br></br>
                            <div key={message.key} style={{ float: 'right',width: "200px", marginLeft: '10px', backgroundColor: 'blue', color: 'white', paddingTop: '20px', borderRadius: '10px', paddingBottom: '20px'}} >
                                <h5>{message.message}</h5>
                            </div> <br></br>
                        </div>  
                    )
                    }else {
                    return(

                        <div style={{ float: 'left', width: "55%", marginTop:'15px'}} >
                        <span style={{ float: 'left'}}> {message.user}</span> <br></br>
                        <div key={message.key} style={{ width: "200px", marginLeft: '10px', backgroundColor: 'green', color: 'white', paddingTop: '20px', borderRadius: '10px', paddingBottom: '20px'}} >
                            <h5>{message.message}</h5>
                        </div> 
                    </div>    
                    )
                    }
                                }))}
              </div>
          </div>
          <div className="col-md-2"></div>
          </div>
          <div className="row" style={{ marginTop: "3rem"}}>
              <div className="col-md-2"></div>
              <div className="col-md-6">
                  <input onChange={onChange} placeholder="votre message" value={content} style={{ width : "100%", height:"50px"}}/>
              </div>
              <div className="col-md-2">
                  <button className="btn-lg btn-primary" onClick={onSend}>Envoyer</button>
              </div>
          </div>
          
      </div>
    
  );
}


export default Chat;