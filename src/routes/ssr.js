import React from 'react';
import express from 'express';
import ReactDomServer from 'react-dom/server';
import App from '../App';

const router = express.Router();
router.get('/ssr', async (req, res) => {

    const html = ReactDomServer.renderToString(<App/>);

    const theHtml = `
        <html>
            <head>
                <title>My First SSR</title>
            </head>
            <body>
                <div id="reactele">${html}</div>
                <script src="/app.js" charset="utf-8"></script>
                <script src="/vendor.js" charset="utf-8"></script>
            </body>
        </html>`;
    res.send(theHtml);
});

export default router;