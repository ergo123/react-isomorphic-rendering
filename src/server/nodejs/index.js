import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import bodyParser from 'body-parser';
import App from '../../App';

// Expose XMLHttpRequest globally so ModelManager can use it
global.fetch = require('node-fetch/lib/index');

const exapp = express();
//Here we are configuring express to use body-parser as middle-ware.
exapp.use(bodyParser.urlencoded({extended: false}));
exapp.use(bodyParser.json());
exapp.use(express.static('dist'));

function renderModelToHTMLString() {
    const html = ReactDOMServer.renderToString(<App/>);

    let state = {
        dummy: { a: 1, b: 2, c: 3}
    };
    let stateStr = JSON.stringify(state);

    return `<!doctype html>
    <html>
      <head>
        <title>SPAPOC TEMPLATE</title>
      </head>
      <body>
        <div id='root'>${html}</div>
        <script type='application/json' id='__INITIAL_STATE__'>
            ${stateStr}
        </script>
      </body>
    </html>`;
}

exapp.get('/', function(req, res){
    res.send(renderModelToHTMLString());
});
exapp.get('/test', function(req, res){
    res.send('SSR Server for SPA POC.');
});

exapp.listen(4222, () => console.log('SSR server listening on port 4200.'));
