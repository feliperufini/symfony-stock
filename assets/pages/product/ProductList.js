import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function ProductList() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetchProductList()
    }, []);

    const fetchProductList = () => {
        axios.get('/api/product')
            .then(function (response) {
                setProductList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Essa operação não poderá ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dd3333',
            confirmButtonText: 'Sim, remover!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/product/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Produto deletado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        fetchProductList();
                        console.log(response);
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ocorreu um erro!',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Gerenciar Produtos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Cadastrar Produto
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th width="240px">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.map((product) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>{product.amount}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${product.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Visualizar
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${product.id}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Deletar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductList;