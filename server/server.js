import path from 'path'
import fs from 'fs'
import axios from 'axios';

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'
import {StaticRouter} from 'react-router';
import store from '../src/services/store/store';
import {fetchApp, fetchPage} from '../src/services/store/actions';
import {Provider} from 'react-redux';
import {appRenderer, pageRenderer} from './apiRenderer';

const PORT = 8080
const app = express()

const router = express.Router()

const serverRenderer = (req, res) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }

        axios.defaults.baseURL = 'http://localhost:8080';

        const pageId = req.path.substr(1);

        return store.dispatch(fetchApp())
            .then(() => store.dispatch(fetchPage(pageId)))
            .then(() => {
                const html = ReactDOMServer.renderToString(
                    <StaticRouter location={req.originalUrl}>
                        <Provider store={store}>
                            <App/>
                        </Provider>
                    </StaticRouter>
                );

                let stateStr = JSON.stringify(store.getState());

                return res.send(data
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${html}</div>`
                    )
                    .replace(
                        '<script type="application/json" id="__INITIAL_STATE__"></script>',
                        `<script type="application/json" id="__INITIAL_STATE__">${stateStr}</script>`,
                    )
                )
            }
        );

    })
}

router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }));
router.get('/api/app.model.json', appRenderer)
router.get('/api/pages/:page.model.json', pageRenderer)
router.get(/^\/.+$/i, serverRenderer)

app.use(router)
app.listen(PORT, () => console.log(`SSR running on port ${PORT}`))
