import React from 'react';
import './index.css';
import {Link, Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Page} from './pages/Page';

function App() {

  const pages = ['home', 'p1', 'p2', 'p3', 'p4', 'p5', 'new', 'different', 'etc']

  return (
    <div className="App">
      <Helmet>
          <meta content="SSR" property="og:title" />
          <meta content="SSR example description" name="description"  />
      </Helmet>

      <header className="app-header">
          {pages.map(page => <Link to={'./' + page} key={page}>{page}</Link>)}
      </header>
     <Switch>
        <Route path={'/:id'}><Page/></Route>
      </Switch>
    </div>
  );
}

export default App;
