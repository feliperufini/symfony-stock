import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function CategoryCreate() {
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData();
        formData.append("name", name);

        axios.post('/api/category', formData)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria salva com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setIsSaving(false);
                setName('');
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
                <h2 className="text-center mt-5 mb-3">Cadastrar Categoria</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">Listar Categorias
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
                                className="btn btn-outline-primary mt-3">
                                Salvar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CategoryCreate;