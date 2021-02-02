import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Header from "./u2-header/Header";
import Routes from "./u3-routes/Routes";

const App = () => {
  return (
    <div className="App">
      <HashRouter >
        <Header/>
        <Routes/>
      </HashRouter>
    </div>
  )
}

export default App;
