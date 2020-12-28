import React from 'react'

export default function TopInputs({order, setOrder, errors}) {

    const handleInputChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    }

    return (
            <div className="row">
                <div className="mb-2 col-12 col-sm-12 col-md-4 col-lg-4">
                    <label className="mr-auto">Nombre</label>
                    <input name="name" value={order.name} type="text" className="form-control" onChange={handleInputChange} />
                    <span className="text-danger">{errors.name}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-4 col-lg-4">
                    <label className="mr-auto">Hora de entrega</label>
                    <input name="time" value={order.time} type="time" className="form-control" onChange={handleInputChange} />
                    <span className="text-danger">{errors.time}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-4 col-lg-4">
                    <label className="mr-auto">Envío</label>
                    <select name="delivery" value={order.delivery} className="form-control" onChange={handleInputChange}>
                        <option selected disabled value="">Elegir</option>
                        <option value="Iván">Iván</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Busca">Busca</option>
                    </select>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label>Dirección</label>
                    <input name="address" value={order.address} type="text" className="form-control" onChange={handleInputChange} />
                    <span className="text-danger">{errors.address}</span>
                </div>
                <div className="mb-2 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label>Notas</label>
                    <input name="notes" value={order.notes} type="text" className="form-control" onChange={handleInputChange} />
                </div>
            </div>
    )
}
