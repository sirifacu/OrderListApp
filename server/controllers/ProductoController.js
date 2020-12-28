import models from '../models';

export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Producto.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.Producto.findOne({ _id: req.query._id });
            if (!reg) {
                res.status(404).send({
                    message: 'Register not found'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Producto.find({ $or: [{ 'nombre': RegExp(valor, 'i') }, { 'descripcion': RegExp(valor, 'i') }] })
                .sort({ 'ordenNum': 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    update: async(req, res, next) => {
        try {
            const reg = await models.Producto.findByIdAndUpdate({ _id: req.body._id }, { codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, precio_venta: req.body.precio_venta, ordenNum: req.body.ordenNum });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Producto.findByIdAndDelete({ _id: req.query._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Producto.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Producto.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    }
}