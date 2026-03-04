const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidade: { type: Number, required: true }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Gera o id_prod virtual
ProdutoSchema.virtual('id_prod').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Produto', ProdutoSchema);