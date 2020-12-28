import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Content/Header';
import Card from './Content/Card'

export default function Orders({history}) {
    const [orders, setOrders] = useState([])
    const [filterDate, setFilterDate] = useState('')

    const listOrders = () => {
        axios.get('pedido/list')
        .then( res => setOrders(res.data))
        .catch( (err) => console.log(err));
    }

    // eslint-disable-next-line
    useEffect(listOrders, []);


    return (
        <>
        <div className="d-flex">
            <Header history={history} orders={orders} filterDate={filterDate} setFilterDate={setFilterDate} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {orders.map(order => order.createdAt.includes(filterDate) ?
                                 <Card  key={order._id}
                                        id={order._id}
                                        name={order.nombre}
                                        address={order.direccion}
                                        time={order.hora}
                                        notes={order.notas}
                                        delivery={order.envio}
                                        details={order.detalles}
                                        totalPrice={order.total}
                                        state={order.estado}
                                        history={history}
                                        listOrders={listOrders} /> : null)}
        </div>
        </>
    )
}
