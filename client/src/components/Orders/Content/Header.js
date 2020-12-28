import React from 'react'
import s from '../../styles/Header.module.css'

export default function Header({history, orders, filterDate, setFilterDate}) {
    const counter = () => {
        let sum = 0;
        for(let i = 0; i < orders.length; i++){
            if(orders[i].createdAt.includes(filterDate)){
                let item = orders[i].detalles
                for(let x = 0; x < item.length; x++){
                sum += (parseFloat(item[x].cantidad));
                }
            }
        }

        return sum
    }
    return (
        <div className="container d-flex">
            <div className={s.third}>
                <input  type="date" 
                        value={filterDate}
                        onChange={e => setFilterDate(e.target.value)}
                        className="form-control mr-auto text-uppercase" 
                        style={{width: '60%'}} />
            </div>
            <div className={s.third}>
                <h3 className="text-center fw-bold">Contador de Burgers: {counter()}</h3>
            </div>
            <div className={`${s.third} text-end`}>
                <button onClick={() => history.push('/orders/add')} className="btn btn-light border border-dark">Nuevo</button>
            </div>
        </div>
    )
}
