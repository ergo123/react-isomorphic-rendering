import { LoremIpsum } from 'lorem-ipsum';

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

export const pageRenderer = (req, res) => {
    res.json({ text: lorem.generateSentences(40) })
}

export const appRenderer = (req, res) => {
    res.json({
        p1: { text: lorem.generateSentences(1) },
        p2: { text: lorem.generateSentences(2) },
        p3: { text: lorem.generateSentences(3) },
        p4: { text: lorem.generateSentences(4) },
        p5: { text: lorem.generateSentences(5) },
        home: { text: lorem.generateSentences(5) },
    })
}
