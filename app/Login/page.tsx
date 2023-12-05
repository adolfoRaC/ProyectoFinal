'use client'
import { useState } from 'react'
import './Login.css'
import { IRegister } from '../models/IRegister';
import axios from "axios";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { ILogin } from "../models/ILogin";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const page = () => {
    const [error, SetError] = useState<string>("");
    const { handleSubmit, register } = useForm<ILogin>();
    const router = useRouter();

    const onSubmit = handleSubmit(async (formData) => {
        const responseLogin = await signIn("credentials", {
            user: formData.user,
            pwd: formData.pwd,
            redirect: false,
        });

        if (responseLogin?.error) {
            SetError("Usuario y/o password incorrectos");
            return;
        } else {
            router.push("/");
        }
    });

    const [isOpen, setIsOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const Open = () => {
        setIsOpen(!isOpen);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [registro, setRegistro] = useState<IRegister>({
        id: 0,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        usuario: '',
        correoElectronico: '',
        pwd: '',
        idRol: 1
    });


    const handleRegistroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

         // Filtrar solo los dígitos para el campo de teléfono
  let newValue = name === 'telefono' ? value.replace(/\D/g, '') : value;

  // Limitar la longitud del campo de teléfono a 10 números
  if (name === 'telefono' && newValue.length > 10) {
    newValue = newValue.slice(0, 10);
  }
        setRegistro({
            ...registro,
            [name]: newValue,
        });
    };



    const handleRegistroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Realizar la solicitud POST utilizando axios
            const response = await axios.post<IRegister>('http://localhost:8080/api/usuarios', registro);

            if (response.status === 201) {
                // 201 significa creado (solicitud exitosa)
                Open();
                Swal.fire({
                    icon: 'success',
                    title: 'Registrado',
                    text: 'El usuario se registró exitosamente.',
                });
                console.log('Solicitud exitosa. Datos del servidor:', response.data);
            } else {
                console.log('Respuesta del servidor:', response.data);
            }

        } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud.',
            });
        }
    };


    return (
        <div className={`container-login ${isOpen ? ' ' : 'sign-up-mode'}`}>
            <div className={`forms-container ${isOpen ? 'login' : 'register'}`}>
                <div className="signin-signup">
                    <form onSubmit={onSubmit} className="sign-in-form">
                        <h2 className="title">Iniciar sesión</h2>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Usuario" {...register("user")} id="Usuario" />
                        </div>
                        <div className="input-field-pwd">
                            <span className="material-symbols-outlined">
                                lock
                            </span>
                            <input
                                {...register("pwd")}
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
                        <input type="submit" value="Iniciar Sesión" className="btn solid" />
                        <div className="row mt-3">
                            <h3 className="text-danger"> {error}</h3>
                        </div>
                    </form>
                    <form onSubmit={handleRegistroSubmit} className="sign-up-form">
                        <h2 className="title">Regístrate</h2>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                badge
                            </span>
                            <input type="text" placeholder="Nombre" name='nombre' value={registro.nombre} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Apellido paterno" name='apellidoPaterno' value={registro.apellidoPaterno} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Apellido materno" name='apellidoMaterno' value={registro.apellidoMaterno} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                call
                            </span>
                            <input type="text" placeholder="Telefono" name='telefono' value={registro.telefono} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <input type="text" placeholder="Usuario" name='usuario' value={registro.usuario} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field">
                            <span className="material-symbols-outlined">
                                alternate_email
                            </span>
                            <input type="text" placeholder="Email" name='correoElectronico' value={registro.correoElectronico} onChange={handleRegistroChange} />
                        </div>
                        <div className="input-field-pwd">
                            <span className="material-symbols-outlined">
                                lock
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña" name='pwd'
                                value={registro.pwd} onChange={handleRegistroChange}
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