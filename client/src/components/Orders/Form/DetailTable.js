import React from 'react';

export default function DetailTable({errors, details, setDetails}) {
    const removeProduct = data => {
        const arr = details.filter(prod => prod._id !== data._id);
        setDetails([...arr])
    }

    const handleInputChangeArray = (e, data) => {
        const arr = details.map(
            item => item._id === data._id ? {...data, [e.target.name]: e.target.value} : item);
        setDetails(arr)
    }

    return (
        <>
            <span className="text-danger">{errors.details}</span>
            <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Borrar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Nota</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {details.map(item => (
                    <tr key={item._id}>
                    <th scope="row">   
                        <span onClick={() => removeProduct(item)} style={{cursor: 'pointer'}} className="d-inline"><i className="far fa-trash-alt"></i></span>
                    </th>
                    <td>{item.producto}</td>
                    <td><input type="text" name="nota" onChange={(e) => handleInputChangeArray(e, item)} value={item.nota} className="form-control" /></td>
                    <td><input type="number" name="cantidad" onChange={(e) => handleInputChangeArray(e, item)} value={item.cantidad} className="form-control" /></td>
                    <td><input type="number" name="precio" onChange={(e) => handleInputChangeArray(e, item)} value={item.precio} className="form-control" /></td>
                    <td>$ {item.cantidad * item.precio}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}
