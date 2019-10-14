import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'
import {StaticRouter} from 'react-router';

const PORT = 8080
const app = express()

const router = express.Router()

const serverRenderer = (req, res) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }

        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.originalUrl}>
                <App/>
            </StaticRouter>
        );

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        )
    })
}

const colorRenderer = (req, res) => {
    res.json(req.params)
}

router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }));
router.get('/api/colors/:color', colorRenderer)
router.get(/^\/.+$/i, serverRenderer)

app.use(router)
app.listen(PORT, () => console.log(`SSR running on port ${PORT}`))
