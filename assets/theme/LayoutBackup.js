import { Bell, Car, GithubLogo, Graph, House, MagnifyingGlass, TShirt, User, UserCircle } from 'phosphor-react';
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Layout = ({ children, pageTitle }) => {
    return (
        <div id="wrapper">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-md fixed-top" style={{ left: "280px" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success pt-0 me-5" type="submit"><MagnifyingGlass size={16} /></button>
                        </form>
                        <div className="d-flex">
                            <button className="btn btn-success pt-0 rounded-circle mx-1" type="submit"><Bell size={16} /></button>
                            <button className="btn btn-success rounded-circle mx-1" type="submit" style={{ paddingLeft: "7px", paddingRight: "7px" }}><UserCircle size={24} /></button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* NAVBAR */}

            {/* SIDEBAR */}
            <nav className="fixed-top h-100" style={{ width: "280px" }}>
                <div className="h-100 p-3">
                    <a href="/" className="d-flex mb-3 mb-md-0 me-md-auto text-decoration-none">
                        <GithubLogo size={40} />
                        <span className="fs-4">Sidebar</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">
                                <House size={16} />
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                                <Graph size={16} />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                                <Car size={16} />
                                Orders
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                                <TShirt size={16} />
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                                <User size={16} />
                                Customers
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* SIDEBAR */}

            {/* CONTENT */}
            <main style={{ marginLeft: "280px", marginTop: "60px" }}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center w-100 p-4 pb-2 mb-3 border-bottom">
                    <Breadcrumb title={pageTitle} breadcrumbs={['Home', 'Produtos']} />
                    {children}
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <script>document.write(new Date().getFullYear())</script>2023 © Minton theme by <a href="#">Coderthemes</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
            {/* CONTENT */}
        </div>
    )
}

export default Layout;