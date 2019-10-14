import React, {useState} from 'react';

function App() {

  const [show, setShow] = useState(false);

  return (
    <div className="App">

      { show ? <h1 onClick="setShow(true)">My First Server Side Render</h1> : null }
      { !show ? <h1 onClick="setShow(false)">My Second Server Side Render</h1> : null }
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
