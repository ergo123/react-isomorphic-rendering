import path from 'path'
import fs from 'fs'
import { LoremIpsum } from 'lorem-ipsum';

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'
import {StaticRouter} from 'react-router';

const PORT = 8080
const app = express()

const router = express.Router()

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

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

const pageRenderer = (req, res) => {
    res.json({ text: lorem.generateSentences(40) })
}

const appRenderer = (req, res) => {
    res.json({
        p1: { text: lorem.generateSentences(1) },
        p2: { text: lorem.generateSentences(2) },
        p3: { text: lorem.generateSentences(3) },
        p4: { text: lorem.generateSentences(4) },
        p5: { text: lorem.generateSentences(5) },
        home: { text: lorem.generateSentences(5) },
    })
}

router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }));
router.get('/api/app.model.json', appRenderer)
router.get('/api/pages/:page.model.json', pageRenderer)
router.get(/^\/.+$/i, serverRenderer)

app.use(router)
app.listen(PORT, () => console.log(`SSR running on port ${PORT}`))
