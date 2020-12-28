import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from './Form/'

export default function EditProduct({ match, history }) {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        code: '',
        sortNumber: ''
    })
    const [errors, setErrors] = useState({});

    const getProduct = () => {
        axios.get('producto/query?_id=' + match.params.id)
            .then( (res) => { setProduct({
                name: res.data.nombre,
                price: res.data.precio_venta,
                description: res.data.descripcion,
                code: res.data.codigo,
                sortNumber: res.data.ordenNum
            }); })
            .catch(err => {console.log(err)})
    }

    // eslint-disable-next-line
    useEffect(getProduct, [])

    const handleInputChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const validate = (product) => {
        let errors = {};
        if (!product.name) {
            errors.name = 'Tenés que escribir un nombre.';
        } 
        if(!product.price) {
            errors.price = 'Tenés que agregar un precio.'
        } 
        if(!product.description) {
            errors.description = 'Tenés que escribir una descripción.'
        } 
        if(!product.code) {
            errors.code = 'Tenés que escribir un código.'
        } 
        if(!product.sortNumber) {
            errors.sortNumber = 'Tenés que escribir un número para ordenar.'
        } 
      
        return errors;
      };

    const editProduct = () => {
        setErrors(validate(product))
        if(product.name !== '' && product.price !== '' && product.description !== '' && product.code !== '' && product.sortNumber !== ''){
            axios.put('producto/update', {
                '_id': match.params.id,
                'nombre': product.name, 
                'precio_venta': product.price, 
                'descripcion': product.description, 
                'codigo': product.code, 
                'ordenNum': product.sortNumber})
                .then(() => history.push('/products'))
                .catch((err) => { console.log(err); });
          }
    }

    

    return (
        <Form   product={product}
                errors={errors} 
                handleInputChange={handleInputChange} 
                saveEdit={editProduct} 
                history={history} 
                title="Editar Producto" />
    )
}
