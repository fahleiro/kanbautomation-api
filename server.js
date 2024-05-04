const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    res.json({ message: 'API ONLINE' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
