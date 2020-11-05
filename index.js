const express = require('express');
const homeDir = require('os').homedir()
const desktopDir = `${homeDir}/Desktop`
const app = express();
const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const axios = require('axios');
const fireBaseStorage = 'https://firebasestorage.googleapis.com/v0/b/desafio-thexstudios.appspot.com/o/certificate.hbs?alt=media&token=df5bdfb9-14ba-44e1-9688-448565464103'

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebar compile template + data
const compile = async function (templateUrl, data) {
    return hbs.compile(templateUrl)(data);
}

// POST certificates
app.post('/certificado', async (req, res) => {
    const { name, course, date } = req.body;

    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();

        const content = await axios.get(fireBaseStorage)
            .then(
                response => compile((response.data), {
                    name,
                    course,
                    date
                })
            ).catch(
                error => console.log(error)
            );

        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: `certificado.pdf`,
            format: 'A4',
            printBackground: true,
            landscape: true
        });

        console.log('done');
        res.status(200).json({ msg: 'Conversion process successfully completed ' });
        await browser.close();
        process.exit();

    } catch (e) {
        console.log('Error: ', e);
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));