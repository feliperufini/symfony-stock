import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../../theme/Layout";
import axios from 'axios';

function ProductShow() {
    const [id, setId] = useState(useParams().id);
    const [product, setProduct] = useState({ name: '', description: '', price: 0.00, amount: 0 });

    useEffect(() => {
        axios.get(`/api/product/${id}`)
            .then(function (response) {
                setProduct(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Produto - {product.name}</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-info float-right"
                            to="/product"> Visualizar Todos
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Nome:</b>
                        <p>{product.name}</p>
                        <b className="text-muted">Descrição:</b>
                        <p>{product.description}</p>
                        <b className="text-muted">Preço:</b>
                        <p>{product.price}</p>
                        <b className="text-muted">Quantidade:</b>
                        <p>{product.amount}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductShow;