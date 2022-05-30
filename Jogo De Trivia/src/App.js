import React from 'react';
/* import logo from './trivia.png'; */
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Game from './pages/Game';
import Login from './pages/Login';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

const GlobalStyle = createGlobalStyle`
* {
  padding: 0px;
  font-family: sans-serif;
  margin: 0px;
}
`;

export default function App() {
  return (
    <main>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/configuracao" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </main>
  );
}
