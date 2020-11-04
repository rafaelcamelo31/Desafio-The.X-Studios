const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const axios = require('axios');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebar compile template + data
const compile = async function (templateUrl, data) {
    return hbs.compile(templateUrl)(data);
}

// POST certificates
app.post('/certificado', async (req, res) => {
    const { name, course } = req.body;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await axios.get(
            'https://firebasestorage.googleapis.com/v0/b/desafio-thexstudios.appspot.com/o/certificate.hbs?alt=media&token=c094448d-e952-4174-92a2-e4a8ff6b6b56'
        ).then(
            response => compile((response.data), {
                name,
                course
            })
        ).catch(
            error => console.log(error)
        );

        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'mypdf.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log('done');
        res.status(200).json({ msg: 'Convertion Successful' });
        await browser.close();
        process.exit();

    } catch (e) {
        console.log('Error: ', e);
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));