import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../../theme/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function ProductEdit() {
    const [id, setId] = useState(useParams().id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.00);
    const [amount, setAmount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/api/product/${id}`)
            .then(function (response) {
                let product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setAmount(product.amount);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocorreu um erro!',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log(error);
            })

    }, []);

    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/product/${id}`, {
            name: name,
            description: description,
            price: price,
            amount: amount
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Produto atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setIsSaving(false);
                console.log(response);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocorreu um erro!',
                    showConfirmButton: false,
                    timer: 2500
                });

                setIsSaving(false);
                console.log(error);
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Editar Produto</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-info float-right"
                            to="/product">Visualizar Produtos
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descrição</label>
                                <textarea
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    value={description}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"
                                    required ></textarea>
                            </div>
                            <div>
                                <label htmlFor="price">Preço</label>
                                <input
                                    onChange={(event) => { setPrice(event.target.value) }}
                                    value={price}
                                    type="number"
                                    step=".01"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    required />
                            </div>
                            <div>
                                <label htmlFor="amount">Quantidade</label>
                                <input
                                    onChange={(event) => { setAmount(event.target.value) }}
                                    value={amount}
                                    type="number"
                                    step="1"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    required />
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-success mt-3">
                                Salvar Produto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductEdit;