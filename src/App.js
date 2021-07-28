import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import LoginComponent from './component/Login.component';
import RegisterComponent from './component/Register.component';
import Editor from './component/Editor/Editor';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
 
  const [isLogged , setIsLogged ]= useState(false);

  const isLogin = () => {
      setIsLogged(true)
      console.log("isLogged ", isLogged)
  }

  const disconnect = () => {
      setIsLogged(false)
      console.log("isLogged ", isLogged)
  }

  return (
    <div className="App" style={{ paddingTop: "5rem"}}>
       <Router>
       <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route path="/editor/:key">
            <Editor />
          </Route>
          <Route path="/register">
            <RegisterComponent />
          </Route>
          <Route path="/login">
            <LoginComponent  isLogin={isLogin}/>
          </Route>
        </Switch>
       </Router>
    </div>
  );
}

export default App;
