const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT

app.use(express.json()); // Middleware para permitir o uso de req.body com JSON

// Endpoint para receber a solicitação e repassar para o servidor destino
app.post('/postLoggedTime', async (req, res) => {
    const { apiKey, server, cards } = req.body; // Extrair apiKey, server e cards do corpo da requisição

    try {
        // Verificar se todos os parâmetros necessários foram fornecidos
        if (!apiKey || !server || !cards) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        // Iterar sobre cada bloco de cartas
        for (const cardBlock of cards) {
            // Fazer solicitação para o servidor destino para cada bloco de cartas
            const response = await axios.post(server, cardBlock, {
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            // Registrar a resposta para cada bloco de cartas
            console.log('Resposta do servidor destino:', response.data);
        }

        // Retornar uma mensagem de sucesso após o envio de todas as solicitações
        res.json({ message: 'Solicitações enviadas com sucesso para todos os blocos de cartas' });
    } catch (error) {
        // Verificar se o erro é uma resposta do servidor destino
        if (error.response) {
            // Se o servidor destino respondeu com um status de erro, retornar detalhes do erro
            console.error('Erro no servidor destino:', error.response.data);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            // Se a solicitação foi feita, mas não houve resposta do servidor destino
            console.error('Sem resposta do servidor destino:', error.request);
            res.status(500).json({ message: 'Sem resposta do servidor destino' });
        } else {
            // Se ocorreu um erro durante o processamento da solicitação
            console.error('Erro ao processar a solicitação:', error.message);
            res.status(500).json({ message: 'Erro ao processar a solicitação' });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
