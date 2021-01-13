const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/pdf', async (req, res) => {
    const url = req.query.target;
    console.log('get url')
    const browser = await puppeteer.launch({
        headless: true
    });
    console.log('get browser')
    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: 'networkidle0'
    });
    console.log('go to')

    const pdf = await webPage.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    });
    console.log('fin')

    await browser.close()

    console.log(pdf)
    res.contentType('application/pdf');
    res.send(pdf);
})

app.listen(3000, () => {
    console.log('Make PDF running ... 🔥');
})