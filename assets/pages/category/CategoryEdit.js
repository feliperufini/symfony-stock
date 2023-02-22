import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function CategoryEdit() {
    const [id, setId] = useState(useParams().id);
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/api/category/${id}`)
            .then(function (response) {
                let category = response.data;
                setName(category.name);
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
        axios.patch(`/api/category/${id}`, {
            name: name,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria atualizada com sucesso!',
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
                <h2 className="text-center mt-5 mb-3">Editar Categoria</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">Visualizar Categorias
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Categoria</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    required />
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Salvar Categoria
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryEdit;