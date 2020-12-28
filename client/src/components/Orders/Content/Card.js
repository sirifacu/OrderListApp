import React from 'react';
import axios from 'axios';
import s from '../../styles/Card.module.css';

export default function Card(props) {
    const {id, name, address, time, notes, delivery, details, totalPrice, state, history, listOrders} = props
    let classOne = "text-start my-1"
    const stateColor = () => {
        if(state === 1) return 'success';
        return 'danger'
    }
    const btnColor = () => {
        if(state === 1) return 'success';
        return 'secondary'
    }

    const removeOrder = () => {
        axios.delete('pedido/remove?_id='+id)
            .then( () => listOrders())
            .catch( err => console.log(err) )
    }

    const prepared = () => {
        if(parseInt(state) === 0){
            axios.put('pedido/activate', {'_id': id})
                .then( () => listOrders() )
                .catch( (err) => console.log(err) );
        } else if(parseInt(state) === 1){
            axios.put('pedido/deactivate', {'_id': id})
                .then( () => listOrders() )
                .catch( (err) => console.log(err) );
        }
    }
    return (
        
        <div className={`${s.wrapper} border-${stateColor()}`}>
            <div className={s.cols}>
                {/* Left Column */}
                <div className={s.half}>
                    <p className={classOne}>Nombre: <span className={`text-${stateColor()}`}>{name}</span></p>
                    <p className={classOne}>Dirección: <span className={`text-${stateColor()}`}>{address}</span></p>
                    <p className={classOne}>Hora de salida: <span className={`text-${stateColor()}`}>{time}</span></p>
                    {notes && <p className={classOne}>Notas: <span className={`text-${stateColor()}`}>{notes}</span></p>}
                    <p className={classOne}>Envío: <span className={`text-${stateColor()}`}>{delivery}</span></p>
                </div>

                {/* Right Column */}
                <div className={s.half}>
                    <ul className="list-group list-group-flush">
                        {details.map(item => (
                            <li className="text-left px-0 list-group-item" key={item._id} >
                                <span className={`py-0 text-${stateColor()}`} >{item.cantidad}</span><span className="py-0"> - {item.producto}</span><br />
                                <span className={`text-${stateColor()}`}><small>{item.nota}</small></span>
                            </li>
                        ))}
                        <li className={`list-group-item h3 text-center text-${stateColor()}`}>$ {totalPrice}</li>
                    </ul>
                </div>
            </div>

            <div className={`${s.buttons} mb-2`}>
                <div>
                    <button onClick={prepared} className={`mx-2 btn btn-${btnColor()}`} >Preparado</button>
                    <button onClick={() => history.push(`orders/edit/${id}`)} className="mx-2 btn btn-primary">Editar</button>
                    <button onClick={removeOrder} className="mx-2 btn btn-danger">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
