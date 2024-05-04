const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post('/postLoggedTime', async (req, res) => {
    const { apiKey, server, cards } = req.body;

    try {
        if (!apiKey || !server || !cards) {
            return res.status(400).json({ message: 'Invalid parameters' });
        }

        for (const cardBlock of cards) {
            const response = await axios.post(server, cardBlock, {
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response of destiny server:', response.data);
        }

        res.json({ message: 'Sucssessful requests!' });
    } catch (error) {
        if (error.response) {
            console.error('Error from destiny server: ', error.response.data);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            console.error('No response from destiny server: ', error.request);
            res.status(500).json({ message: 'Sem resposta do servidor destino' });
        } else {
            console.error('Error processing the request: ', error.message);
            res.status(500).json({ message: 'Erro ao processar a solicitação' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server start at ${port}`);
});
