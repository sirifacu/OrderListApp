import mongoose, { Schema } from 'mongoose';

const productoSchema = new Schema({
    codigo: { type: String, maxlength: 64, required: true },
    nombre: { type: String, maxlength: 50, unique: true, required: true },
    descripcion: { type: String, maxlength: 255 },
    precio_venta: { type: Number, required: true },
    ordenNum: { type: Number, required: true },
    estado: { type: Number, default: 1 },
});

const Producto = mongoose.model('producto', productoSchema);

export default Producto;