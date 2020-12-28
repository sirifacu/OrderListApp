import mongoose, { Schema } from 'mongoose';

const pedidoSchema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    notas: { type: String, maxlength: 255 },
    total: { type: Number, required: true },
    estado: { type: Number, default: 0 },
    envio: { type: String },
    hora: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    detalles: [{
        _id: { type: String, required: true },
        producto: { type: String, required: true },
        cantidad: { type: Number, required: true },
        nota: { type: String },
        precio: { type: Number, required: true }
    }]
});

const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;