import models from '../models';


export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Pedido.create(req.body);
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
            const reg = await models.Pedido.findOne({ _id: req.query._id });
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
            const reg = await models.Pedido.find({ $or: [{ 'nombre': RegExp(valor, 'i') }, { 'direccion': RegExp(valor, 'i') }] })
                .sort({ 'createdAt': 1, 'hora': 1 });
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
            const reg = await models.Pedido.findByIdAndUpdate({ _id: req.body._id }, {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                notas: req.body.notas,
                total: req.body.total,
                hora: req.body.hora,
                envio: req.body.envio,
                detalles: req.body.detalles
            });
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
            const reg = await models.Pedido.findByIdAndDelete({ _id: req.query._id });
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
            const reg = await models.Pedido.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
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
            const reg = await models.Pedido.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    grafico12Meses: async(req, res, next) => {
        try {
            const reg = await models.Pedido.aggregate(
                [{
                        $group: {
                            _id: {
                                mes: { $month: '$createdAt' },
                                year: { $year: '$createdAt' }
                            },
                            total: { $sum: '$total' },
                            numero: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            "_id.year": -1,
                            "_id.month": -1
                        }
                    }
                ]
            ).limit(12);

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    },
    consultaFechas: async(req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            const reg = await models.Pedido.find({ "createdAt": { "$gte": start, "$lt": end } })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There has been an error'
            });
            next(e);
        }
    }
}