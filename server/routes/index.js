import routerx from 'express-promise-router';
import productoRouter from './producto';
import pedidoRouter from './pedido'

const router = routerx();

router.use('/producto', productoRouter);
router.use('/pedido', pedidoRouter);

export default router;