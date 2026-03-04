const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    endereco: { type: String, required: true },
    senha: { type: String, required: true } // Em um projeto real, faríamos hash aqui
}, { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

// Criando um virtual para 'id_user' para ficar igual ao seu pedido
UsuarioSchema.virtual('id_user').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);