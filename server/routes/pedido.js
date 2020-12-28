import routerx from 'express-promise-router';
import pedidoController from '../controllers/PedidoController';

const router = routerx()

router.post('/add', pedidoController.add);
router.get('/query', pedidoController.query);
router.get('/list', pedidoController.list);
router.put('/update', pedidoController.update);
router.delete('/remove', pedidoController.remove);
router.put('/activate', pedidoController.activate);
router.put('/deactivate', pedidoController.deactivate);
router.get('/grafico12Meses', pedidoController.grafico12Meses);
router.get('/consultaFechas', pedidoController.consultaFechas);

export default router;