import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategoryList()
    }, []);

    const fetchCategoryList = () => {
        axios.get('/api/category')
            .then(function (response) {
                setCategoryList(response.data);
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
                axios.delete(`/api/category/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Categoria deletada com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        fetchCategoryList();
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
                <h2 className="text-center mt-5 mb-3">Gerenciar Categorias</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Cadastrar Categoria
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th width="240px">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((category) => {
                                    return (
                                        <tr key={category.id}>
                                            <td>{category.name}</td>
                                            <td>{category.amount}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${category.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Visualizar
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${category.id}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
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

export default CategoryList;