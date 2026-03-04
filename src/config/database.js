const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        
        if (!url) {
            throw new Error("A variável MONGO_URL não foi definida no arquivo .env");
        }

        // Removido o objeto { useNewUrlParser: true, useUnifiedTopology: true }
        await mongoose.connect(url);

        console.log('✅ MongoDB Conectado com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;