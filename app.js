const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const IndexRoutes = require('./index.js');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(IndexRoutes);

app.use((req, res, next) => {
    res.status(404).send('<html> Page not found </html>'); 
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
