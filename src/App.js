import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import getPageKeywords from './getPageKeywords';

class App extends Component {
  
  constructor(props){
        super(props);
        this.getKeywords=this.getKeywords.bind(this);
    }
  
     
  

  getKeywords() {


    var pageCounter = 0;
    var pageKeywords = getPageKeywords(pageCounter);
    console.log(pageKeywords);

    
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href="#" onClick={this.getKeywords}>Click here to get keywords</a>
        </p>
      </div>
    );
  }
}

export default App;
