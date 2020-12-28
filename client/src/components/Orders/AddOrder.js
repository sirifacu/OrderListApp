import React, {useState} from 'react';
import axios from 'axios';
import TopInputs from './Form/TopInputs';
import ProductSearch from './Form/ProductSearch';
import DetailTable from './Form/DetailTable'

export default function AddOrder({history}) {
    const [order, setOrder] = useState({
        name: '',
        time: '',
        delivery: '',
        address: '',
        notes: ''
    });
    const [details, setDetails] = useState([])
    const [errors, setErrors] = useState({});

    const saveOrder = () => {
        setErrors(validate(order, details))
        if(order.name !== '' && order.time !== '' && order.address !== '' && details.length > 0){
            let date = new Date();
            date = date.setHours(0, 0, 0, 0)
            axios.post('pedido/add', {
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
            <h2 className="fw-bold mb-4">Agregar Pedido</h2>
            <div className="container">
                
                <TopInputs order={order} setOrder={setOrder} errors={errors} />

                <ProductSearch details={details} setDetails={setDetails} />
                
                <DetailTable errors={errors} details={details} setDetails={setDetails} />
                  
                <p className="text-end"><span className="fw-bold"> Precio Total: </span>  $ {calculatePrice()}</p>
            
            </div>
            <button onClick={() => history.push('/orders')} type="button" className="mx-2 btn btn-secondary">Cerrar</button>
            <button onClick={saveOrder} type="button" className="mx-2 btn btn-success">Guardar</button>
        </div>
    )
}
