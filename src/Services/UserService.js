import { subscribeList, pushData, setData, createUser } from './Connection';


export function getAllFiles(){
  subscribeList('/files', files => {
      console.log('files', files)
  });
}

export function createFile(detail){
        const id = pushData('/files', detail);
        setData(`/messages/${id}`, {messages: ""});
}

export function updateFile(){

}

export function getFileContent(){

    }

export function updateFileContent(){

    }
