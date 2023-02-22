import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/product/ProductList";
import ProductCreate from "./pages/product/ProductCreate";
import ProductEdit from "./pages/product/ProductEdit";
import ProductShow from "./pages/product/ProductShow";
import CategoryList from "./pages/category/CategoryList";
import CategoryCreate from "./pages/category/CategoryCreate";
import CategoryEdit from "./pages/category/CategoryEdit";

function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ProductList />} />
                <Route path="/product" element={<ProductList />} />
                <Route path="/product/create" element={<ProductCreate />} />
                <Route path="/product/edit/:id" element={<ProductEdit />} />
                <Route path="/product/show/:id" element={<ProductShow />} />
                <Route path="/category" element={<CategoryList />} />
                <Route path="/category/create" element={<CategoryCreate />} />
                <Route path="/category/edit/:id" element={<CategoryEdit />} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <Main />
        </StrictMode>
    );
}