const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do armazenamento de arquivos usando o multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados'
});

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para o formulário de upload
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar o envio do formulário
app.post('/upload', upload.single('file'), (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const file = req.file.buffer;

    // Gere um ID único (pode usar uma biblioteca como uuid)
    const fileId = 'file_' + Date.now();

    // Salve no banco de dados
    connection.query('INSERT INTO uploaded_files (file_id, title, description) VALUES (?, ?, ?)', [fileId, title, description], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao processar o upload.');
            return;
        }

        // Salve o arquivo em um local ou armazenamento de sua escolha

        res.send('Upload concluído com sucesso!');
    });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
