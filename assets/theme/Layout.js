import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import './layout.scss';

window.onload = function () {
  const showNavbar = () => {
    const toggle = document.getElementById('header-toggle');
    const nav = document.getElementById('nav-bar');
    const bodypd = document.getElementById('body');
    const headerpd = document.getElementById('header');

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar();

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  // Your code to run since DOM is loaded and ready
};

const Layout = ({ children, pageTitle }) => {
  return (
    <div id="wrapper">
      {/* NAVBAR */}
      <header className="header" id="header">
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle"></i>
        </div>
        <div className="header_img">
          <img src="https://github.com/feliperufini.png" alt="" />
        </div>
      </header>
      {/* NAVBAR */}

      {/* SIDEBAR */}
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <i className='bx bx-layer nav_logo-icon'></i>
              <span className="nav_logo-name">BBBootstrap</span>
            </a>
            <div className="nav_list">
              <a href="#" className="nav_link active">
                <i className='bx bx-grid-alt nav_icon'></i>
                <span className="nav_name">Dashboard</span>
              </a>
              <a href="#" className="nav_link">
                <i className='bx bx-user nav_icon'></i>
                <span className="nav_name">Users</span>
              </a>
              <a href="#"
                className="nav_link">
                <i className='bx bx-message-square-detail nav_icon'></i>
                <span className="nav_name">Messages</span>
              </a>
              <a href="#" className="nav_link">
                <i className='bx bx-bookmark nav_icon'></i>
                <span className="nav_name">Bookmark</span>
              </a>
              <a href="#"
                className="nav_link">
                <i className='bx bx-folder nav_icon'></i>
                <span className="nav_name">Files</span>
              </a>
              <a href="#" className="nav_link">
                <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                <span className="nav_name">Stats</span>
              </a>
            </div>
          </div>
          <a href="#" className="nav_link">
            <i className='bx bx-log-out nav_icon'></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
      {/* SIDEBAR */}

      {/* CONTENT */}
      <div className="height-100 bg-light" id="body">
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
      {/* CONTENT */}
    </div>
  )
}

export default Layout;