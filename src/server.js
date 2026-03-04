require('dotenv').config(); // Carrega o .env antes de tudo
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3333;

// Executa a conexão com o banco
connectDB();

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});