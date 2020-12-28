import React, {useState} from 'react';
import axios from 'axios';

export default function ProductSearch({details, setDetails}) {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const searchProducts = search => {
        axios.get('producto/list?valor='+ search)
        .then( res => setResult(res.data) )
        .catch( err => console.log(err) ); 
    }

    const addProduct = data => {
        setDetails([
                ...details,
                {
                    _id: data._id,
                    producto: data.nombre,
                    nota: data.nota,
                    cantidad: 1,
                    precio: data.precio_venta
                }]
        )
    }

    return (
        <>
        <div className="d-flex justify-content-center my-4">                        
                <input value={search} onChange={e => setSearch(e.target.value)} type='text' className='form-control mx-2' style={{width: '30%'}} />
                <button onClick={() => searchProducts(search)} className="btn btn-outline-primary mx-2"><i className="fas fa-search"></i></button>
                <button onClick={() => {setResult([]); setSearch('')} } className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button>
            </div>

            {result.length ? (
                <div className="d-flex justify-content-center">
                    <table className="table" style={{width: '50%'}}>
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Agregar</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map( res => (
                                <tr key={res._id}>
                                    <th scope="row">   
                                        <span onClick={() => addProduct(res)} style={{cursor: 'pointer'}} className="d-inline my-auto"><i className="fas fa-plus"></i></span>          
                                    </th>
                                    <td>{res.nombre}</td>
                                    <td>$ {res.precio_venta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>                    
            ) : null}
        </>
    )
}
