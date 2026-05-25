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

    quantidade: {
        type: Number,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    // NOVO CAMPO

    status: {
        type: String,
        enum: [
            'ATIVA',
            'FINALIZADA',
            'CANCELADA'
        ],
        default: 'ATIVA'
    }

}, {
    timestamps: true
});

ListaComprasSchema.virtual('id_lista').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('ListaCompras', ListaComprasSchema);