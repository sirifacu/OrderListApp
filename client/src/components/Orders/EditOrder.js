import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TopInputs from './Form/TopInputs';
import ProductSearch from './Form/ProductSearch';
import DetailTable from './Form/DetailTable'

export default function AddOrder({history, match}) {
    const [order, setOrder] = useState({
        name: '',
        time: '',
        delivery: '',
        address: '',
        notes: ''
    });
    const [details, setDetails] = useState([])
    const [errors, setErrors] = useState({});

    const getOrder = () => {
        axios.get('pedido/query?_id=' + match.params.id)
            .then( (res) => { 
                setOrder({
                name: res.data.nombre,
                time: res.data.hora,
                delivery: res.data.envio,
                address: res.data.direccion,
                notes: res.data.notas
                });
                setDetails(res.data.detalles)
         })
            .catch(err => {console.log(err)})
    }

    // eslint-disable-next-line
    useEffect(getOrder, [])

    const editOrder = () => {
        setErrors(validate(order, details));
        if(order.name !== '' && order.time !== '' && order.address !== '' && details.length > 0){
            let date = new Date();
            date = date.setHours(0, 0, 0, 0)
            axios.put('pedido/update', {
                '_id': match.params.id,
                'nombre': order.name, 
                'direccion': order.address, 
                'notas': order.notes, 
                'total': calculatePrice(), 
                'envio': order.delivery, 
                'hora': order.time, 
                'createdAt': date,
                'detalles': details})
            .then(() => history.push('/orders'))
            .catch((err) => { console.log(err); });
        }
    }

    const validate = (order, details) => {
        let errors = {};
        if (!order.name) {
            errors.name = 'Tenés que escribir un nombre.';
        } 
        if(!order.time) {
            errors.time = 'Tenés que agregar una hora de entrega.'
        } 
        if(!order.address) {
            errors.address = 'Tenés que escribir una dirección.'
        } 
        if(details.length === 0) {
            errors.details = 'Tenés que agregar burgers al pedido.'
        }
      
        return errors;
      };

    const calculatePrice = () => {
        let res = 0;
        for(let i = 0; i < details.length; i++){
            res += (details[i].cantidad * details[i].precio);
        }
        return res;
    }

    return (
        <div className="mt-4 mb-3">
            <h2 className="fw-bold mb-4">Editar Pedido</h2>
            <div className="container">
                
                <TopInputs order={order} setOrder={setOrder} errors={errors} />

                <ProductSearch details={details} setDetails={setDetails} />
                
                <DetailTable errors={errors} details={details} setDetails={setDetails} />
                  
                <p className="text-end"><span className="fw-bold"> Precio Total: </span>  $ {calculatePrice()}</p>
            
            </div>
            <button onClick={() => history.push('/orders')} type="button" className="mx-2 btn btn-secondary">Cerrar</button>
            <button onClick={editOrder} type="button" className="mx-2 btn btn-success">Editar</button>
        </div>
    )
}
