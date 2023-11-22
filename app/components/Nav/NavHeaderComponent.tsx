'use client'
import { useState } from 'react';
import Link from 'next/link';
import './NavHeaderComponent.css'
import Notificacion from '../Notificaciones/notificacion';

const NavHeaderComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [isMenuOpen2, setMenuOpen2] = useState(false);

    const [isMenuOpen3, setMenuOpen3] = useState(false);

    // Función para alternar la apertura y cierre del menú
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const toggleMenu2 = () => {
        setMenuOpen2(!isMenuOpen2);
    };

    const toggleMenu3 = () => {
        setMenuOpen3(!isMenuOpen3);
    };
    return (
        <header className={`${isMenuOpen ? 'menu-toggle' : ''}`}>
            <div className="container-hero">
                <div className="container hero">
                    <div className="customer-support">
                        <span className="material-icons">support_agent</span>
                        <div className="content-customer-support">
                            <span className="text">Soporte al cliente</span>
                            <span className="number">123-456-7890</span>
                        </div>
                    </div>

                    <div className="container-logo">
                        <span className="material-icons">coffee</span>
                        <h1 className="logo"><Link href="/">Tec Coffee</Link></h1>
                    </div>

                    <Link style={{ textDecoration: 'none' }} href='./Carrito'>
                        <div className="container-user">
                            <span className="material-icons">
                                shopping_cart
                            </span>
                            <div className="content-shopping-cart">
                                <span className="text">Carrito</span>
                                <span className="number">(0)</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="header">
                <div className='header-start'>
                    <a className="mobile-btn" onClick={toggleMenu}>
                        <span className="material-icons">{isMenuOpen ? 'close' : 'menu'}</span>
                    </a>
                </div>
                <div className={`header-center ${isMenuOpen2 ? 'show' : ''}`}>
                    <ul>
                        <li>
                            <Link href="/" style={{ display: 'flex', margin: '0 auto' }}>
                                <span className="material-symbols-outlined"> house </span>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link onClick={toggleMenu2} href="#">
                                Services
                                <span className="material-icons expand-more">expand_more</span>
                            </Link>
                            <div className={`drop-menu ${isMenuOpen2 ? 'show' : ''}`}>
                                <ul>
                                    <li>
                                        <Link href="#">Service 1 </Link>
                                    </li>
                                    <li>
                                        <Link onClick={toggleMenu3} href="#">Service 2 <span className="material-icons expand-more">expand_more</span></Link>
                                        <div className={`drop-menu ${isMenuOpen3 ? 'show' : ''}`}>
                                            <ul>
                                                <li>
                                                    <Link href="#">Item 1</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">Item 2</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="#">Service 3</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link href="#">Empleados</Link>
                        </li>
                        <li>
                            <Link href="/Usuario">Usuarios</Link>
                        </li>
                        <li>
                            <Link href="#">Tiendas</Link>
                        </li>
                        {/* <li>
                            <Link href='#'>Acerca</Link>   
                        </li> */}
                    </ul>
                </div>
                <div className="header-end">
                    <ul>
                        <li>
                        <Notificacion></Notificacion>
                        </li>
                        <li>
                            <Link href="/Login" className='a'>
                                <div>
                                    Registrarse
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className=".Link a" style={{ display: 'flex', margin: '0 auto' }}>
                                <span className="material-symbols-outlined" >
                                    person
                                </span>
                                Adolfo

                            </Link>
                            <div className="drop-menu-end">
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <span className="material-symbols-outlined">
                                                manage_accounts
                                            </span>| Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" >
                                            <span className="material-symbols-outlined">
                                                move_item
                                            </span>
                                            |   Cerrar Sesión
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default NavHeaderComponent