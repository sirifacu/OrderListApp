import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products({ history }) {
    const [products, setProducts] = useState([])

    const listProducts = () => {
        axios.get('producto/list')
        .then( res => setProducts(res.data))
        .catch( err => console.log(err));
    }
    
    useEffect(listProducts, [])

    const deleteProduct = (item) => {
        axios.delete('producto/remove?_id='+item._id)
        .then((res) => listProducts())
        .catch( (err) => console.log(err)); 
    }

    const activateDeactivate = (item) => {
        if(item.estado){
            axios.put('producto/deactivate', {'_id': item._id})
                .then((res) => { listProducts(); })
                .catch((err) => { console.log(err); });
        } else if(parseInt(item.estado) === 0) {
            axios.put('producto/activate', {'_id': item._id})
                .then((res) => { listProducts(); })
                .catch((err) => { console.log(err); });
        }
    }
    
    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <button onClick={() => history.push('/products/add')} className="btn btn-outline-dark">Agregar</button>
            </div>
                
             <div className="table-responsive mt-3">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Opciones</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Código</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod => (
                            <tr key={prod._id}>
                            <th scope="row">   
                                <span onClick={() => deleteProduct(prod)} style={{cursor: 'pointer'}} className="d-inline"><i className="far fa-trash-alt"></i></span>
                                <Link style={{color: 'black'}} to={`products/edit/${prod._id}`}>
                                    <span style={{cursor: 'pointer'}} className="d-inline mx-3"><i className="far fa-edit"></i></span>
                                </Link>
                                {prod.estado ? 
                                <span onClick={() => activateDeactivate(prod)} style={{cursor: 'pointer'}} className="d-inline" ><i className="fas fa-ban"></i></span> 
                                :
                                <span onClick={() => activateDeactivate(prod)} style={{cursor: 'pointer'}} className="d-inline" ><i className="fas fa-check"></i></span> 
                                }
                            </th>
                                <td>{prod.nombre}</td>
                                <td>{prod.descripcion}</td>
                                <td>$ {prod.precio_venta}</td>
                                <td>{prod.codigo}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
