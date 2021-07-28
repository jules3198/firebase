import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';

export function initFirebase() {
    firebase.initializeApp({
        apiKey: "AIzaSyAexHeVl2Z3-sZ4Gt4zyUR-dLrMYeYhfag",
        authDomain: "doc-8ea04.firebaseapp.com",
        databaseURL: "https://doc-8ea04-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "doc-8ea04",
        storageBucket: "doc-8ea04.appspot.com",
        messagingSenderId: "59711045517",
        appId: "1:59711045517:web:b2be7e407f5f155e4507c4",
        measurementId: "G-MZXEM3BLK2"
    });
}
export function pushData(path = '/', data) {
    const database = firebase.database();
    const key = database.ref().child(path).push().key;
    console.log(key);
    database.ref(`${path}/${key}`).set(data);
    return key;
} 

export function updateMessages(path = '/', data) {

  firebase.database().ref().child(path)
        .update({messages: data});
}

export function setData(path = '/', data) {
    const database = firebase.database();
    return database.ref(path).set(data);
}

export function subscribeList(path = '/', cb = () => {}) {
    const database = firebase.database();
    let list = [];
    database.ref().child(path)
      .on('child_added', (data) => {
          console.log("data ", data);
          let el = {
              key : data.key,
              values: data.val()
          }
        list.push(el);
        cb(list);
      });
    database.ref().child(path)
      .on('child_removed', (data) => {
        list = list.filter(item => item.key !== data.key);
        cb(list);
      });
  }

  export function getmessages(path = '/', cb = () => {}) {
      console.log("calll =========")
    var messageData = firebase.database().ref(path);
    messageData.on('value', (message) => {
      const data = message.val();
      console.log("data -------- ", data);
      cb(data);
    });
  }

export function createUser({email, password,firstname,lastname}) {
    const auth = firebase.auth();

    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const response = setData(`/users/${user.uid}`, {
                email,
                firstname,
                lastname,

            });
            // ...
            console.log(response);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
}

export function login({email, password}) {

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            console.log("user",user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}

export function logout(){
    return firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export function verifyConnection(){
    const user = firebase.auth().currentUser;
    console.log('user 1 ', user);
    return user;
}

initFirebase();

export {firebase }
