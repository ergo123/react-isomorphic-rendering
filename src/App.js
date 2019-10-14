import React from 'react';
import './index.css';
import {Link, Route, Switch} from 'react-router-dom';
import {Green} from './pages/Green';
import {Red} from './pages/Red';
import {Black} from './pages/Black';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <div className="App">
      <Helmet>
          <meta content="SSR" property="og:title" />
          <meta content="SSR example description" name="description"  />
      </Helmet>

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
