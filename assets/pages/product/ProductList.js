import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "../../theme/Layout";
import Swal from 'sweetalert2';
import axios from 'axios';
import './product.scss';

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
      <div className="w-100">
        <h2 className="text-center mb-3 p-2 bg-white rounded">Gerenciar Produtos</h2>
        <div className="card">
          <div className="card-header">
            <Link
              className="btn btn-primary"
              to="/product/create">Cadastrar Produto
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered table-hover table-sm">
              <caption>Foram encontrados {productList.length} produtos</caption>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
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
                          to={`/product/show/${product.id}`}
                          className="btn btn-info mx-1">
                          Visualizar
                        </Link>
                        <Link
                          className="btn btn-success mx-1"
                          to={`/product/edit/${product.id}`}>
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger mx-1">
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