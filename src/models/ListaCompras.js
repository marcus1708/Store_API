const mongoose = require('mongoose');

const ListaComprasSchema = new mongoose.Schema({
    // Relacionamentos (Foreign Keys)
    id_user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    id_loja: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Loja', 
        required: true 
    },
    id_prod: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Produto', 
        required: true 
    },
    // Dados específicos da lista
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true } // Preço histórico no momento da compra
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Gera o id_lista virtual
ListaComprasSchema.virtual('id_lista').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('ListaCompras', ListaComprasSchema);