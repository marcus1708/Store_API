const mongoose = require('mongoose');

const LojaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    filial: { type: Boolean, default: false } // 'sim' ou 'nao' vira true ou false
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Gera o id_loja virtual para o retorno da API
LojaSchema.virtual('id_loja').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Loja', LojaSchema);