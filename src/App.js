import React from 'react';
import './index.css';
import {Link, Route, Switch} from 'react-router-dom';
import {Green} from './pages/Green';
import {Red} from './pages/Red';
import {Black} from './pages/Black';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/green'}>Green</Link>
        -
        <Link to={'/red'}>Red</Link>
        -
        <Link to={'/black'}>Black</Link>
      </header>
     <Switch>
        <Route path={'/green'}><Green/></Route>
        <Route path={'/red'}><Red/></Route>
        <Route path={'/black'}><Black/></Route>
      </Switch>
    </div>
  );
}

export default App;
