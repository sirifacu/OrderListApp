import routerx from 'express-promise-router';
import productoController from '../controllers/ProductoController';

const router = routerx();

router.post('/add', productoController.add);
router.get('/query', productoController.query);
router.get('/list', productoController.list);
router.put('/update', productoController.update);
router.delete('/remove', productoController.remove);
router.put('/activate', productoController.activate);
router.put('/deactivate', productoController.deactivate);

export default router;