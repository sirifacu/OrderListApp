import React, {useState} from 'react';
import axios from 'axios';
import Form from './Form/'

export default function AddProduct({ history }) {
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        code: '',
        sortNumber: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const validate = (form) => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Tenés que escribir un nombre.';
        } 
        if(!form.price) {
            errors.price = 'Tenés que agregar un precio.'
        } 
        if(!form.description) {
            errors.description = 'Tenés que escribir una descripción.'
        } 
        if(!form.code) {
            errors.code = 'Tenés que escribir un código.'
        } 
        if(!form.sortNumber) {
            errors.sortNumber = 'Tenés que escribir un número para ordenar.'
        } 
      
        return errors;
      };

    const saveProduct = () => {
        setErrors(validate(form))
        if(form.name !== '' && form.price !== '' && form.description !== '' && form.code !== '' && form.sortNumber !== ''){
            axios.post('producto/add', {
                'nombre': form.name, 
                'precio_venta': form.price, 
                'descripcion': form.description, 
                'codigo': form.code, 
                'ordenNum': form.sortNumber})
            .then(() => history.push('/products'))
            .catch((err) => { console.log(err); });
          }
    }

    return (
        <Form   product={form} 
                errors={errors} 
                handleInputChange={handleInputChange} 
                saveEdit={saveProduct} 
                history={history}
                title="Agregar Producto" />
    )
}
