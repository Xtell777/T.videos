// Supondo que você esteja usando Node.js e o pacote 'mysql'
const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'XTELL777',
    password: 'TUBARAO777',
    database: 'youweb_db'
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Exemplo de inserção de dados (substitua isso pelos dados reais)
const videoData = {
    title: 'Vídeo de Teste',
    url: 'https://example.com/video',
    channel_name: 'XTELL777',
    subscribers: 500000,
    views: 1234567,
    publish_date: '2024-02-01', // formato: YYYY-MM-DD
    comments: 123
};

// Inserir dados na tabela 'videos'
connection.query('INSERT INTO videos SET ?', videoData, (err, result) => {
    if (err) {
        console.error('Erro ao inserir dados:', err);
        return;
    }
    console.log('Dados inseridos com sucesso!');
});

// Desconectar após as operações
connection.end();
