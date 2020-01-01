import React,{Component} from 'react';
import './App.css';
import Detail from '../src/login/detail.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WrappedRegistrationForm from "../src/login/home";

class App extends Component {
  render()
  {
    return (
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={WrappedRegistrationForm}/>
          <Route  component={Detail}/>
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
