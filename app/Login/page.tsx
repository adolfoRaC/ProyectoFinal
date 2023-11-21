'use client'
import { useState } from 'react'
import './Login.css'

const page = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const Open = () => {
        setIsOpen(!isOpen);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={`container ${isOpen ? ' ' : 'sign-up-mode'}`}>
            <div className={`forms-container ${isOpen ? 'login' : 'register'}`}>
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Iniciar sesión</h2>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Usuario" name="Usuario" id="Usuario" />
                        </div>
                        <div className="input-field-pwd">
                            <span className="material-symbols-outlined">
                                lock
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña"
                            />
                            <div
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                <span className='material-symbols-outlined'>

                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </div>
                        </div>
                        <input type="button" value="Iniciar Sesión" className="btn solid" />
                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Regístrate</h2>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                badge
                            </span>
                            <input type="text" placeholder="Nombre" />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Apellido paterno" />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Apellido materno" />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                call
                            </span>
                            <input type="text" placeholder="Telefono" />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Usuario" />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                alternate_email
                            </span>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field-pwd">
                            <span className="material-symbols-outlined">
                                lock
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña"
                            />
                            <div
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                <span className='material-symbols-outlined'>

                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </div>
                        </div>
                        <input type="submit" className="btn" value="Regístrate" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>¿Eres Nuevo?</h3>
                        <p>
                            Has clik al siguiente botón para crear tu cuenta !
                        </p>
                        <button className="btn transparent" onClick={Open}>
                            Regístrate
                        </button>
                    </div>
                    <img src="/images/cafe_3.png" className="image img"
                        alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>¿Ya tienes una Cuenta?</h3>
                        <p>
                            Inicie sesión
                        </p>
                        <button className="btn transparent" onClick={Open}>
                            Iniciar Sesión
                        </button>
                    </div>
                    <img src="/images/cafe_4-.png" className="image"
                        alt="" />
                </div>
            </div>
        </div>
    )
}

export default page