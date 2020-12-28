import React from 'react'

export default function Form({product, errors, handleInputChange, saveEdit, history, title}) {
    return (
        <>
        <div className="container mt-5">
            <h2 className="fw-bold mb-4">{title}</h2>
            <div className="row">
                <div className="mb-2 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label className="mr-auto">Nombre</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleInputChange} />
                    <span className="text-danger">{errors.name}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label>Precio</label>
                    <input type="number" className="form-control" name="price" value={product.price} onChange={handleInputChange} />
                    <span className="text-danger">{errors.price}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-12 col-lg-12">
                    <label>Descripción</label>
                    <input type="text" className="form-control" name="description" value={product.description} onChange={handleInputChange} />
                    <span className="text-danger">{errors.description}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-8 col-lg-8">
                    <label className="mr-auto">Código</label>
                    <input type="text" className="form-control" name="code" value={product.code} onChange={handleInputChange} />
                    <span className="text-danger">{errors.code}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-4 col-lg-4">
                    <label>Orden</label>
                    <input type="number" className="form-control" name="sortNumber" value={product.sortNumber} onChange={handleInputChange} />
                    <span className="text-danger">{errors.sortNumber}</span>
                </div>
            </div>
        </div>
        <div className="mt-3">
            <button onClick={() => history.push('/products')} type="button" className="btn btn-secondary mx-2">Cerrar</button>
            <button type="button" onClick={saveEdit} className="btn btn-success mx-2" >Guardar</button> 
        </div>
    </>
    )
}
