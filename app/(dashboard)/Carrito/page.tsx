'use client'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import './Carrito.css'
import { ICarrito } from '@/app/models/ICarrito';
import { IProducto } from '@/app/models/IProducto';

// import 'bootstrap/dist/css/bootstrap.min.css';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 16,
    },
}));
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));
const ButtonGlobal = styled(Button)({
    background: '#4D8B55',
    '&:hover': {
        backgroundColor: '#151515',
        borderColor: '#151515',
        boxShadow: 'none',
    }
})
const page = () => {
    const { data: session, status } = useSession();
    const [carrito, setCarrito] = useState<ICarrito[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            if (session?.user.token) {
                try {
                    const response = await axios.get<ICarrito[]>(`http://localhost:8080/api/carrito/1`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${session.user.token}`
                        },
                    });
                    console.log(response.data);
                    // Para cada elemento en el carrito, realiza una solicitud adicional para obtener detalles del producto
                    const detailedCart = await Promise.all(response.data.map(async (cartItem) => {
                        const productDetailsResponse = await axios.get<IProducto>(`http://localhost:8080/api/productos/${cartItem.idProducto}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                "Authorization": `Bearer ${session.user.token}`
                            },
                        });
                        return {
                            ...cartItem,
                            productDetails: productDetailsResponse.data // asumiendo que hay una propiedad productDetails en ICarrito
                        };
                    }));
                    console.log(detailedCart);
                    setCarrito(detailedCart);
                } catch (error) {
                    console.error('Error al obtener las tiendas:', error);
                }
            };
        }
        fetchData();
    }, [session]);

    const obtenerFecha = () => {

        const fecha = new Date();
        return fecha.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    };

    const obtenerHora = () => {

        const hora = new Date();
        return hora.toTimeString().split(' ')[0]; // Formato: HH:MM:SS
    };
    const handlePedidoClick = async (cartItem: ICarrito) => {

        const { idUsuario, idTienda, cantidad, productDetails } = cartItem;
        const totalPrecio = cantidad * (productDetails ? productDetails.precio : 0);


        const idEstatus = 3;
        const horaActual = obtenerHora();
        const fechaActual = obtenerFecha();

        console.log('Datos del pedido:', { idUsuario, idTienda, cantidad, totalPrecio, horaActual, fechaActual });

        try {
            await axios.post('http://localhost:8080/api/pedidos', {
                fechaActual,
                horaActual,
                idEstatus,
                idTienda,
                idUsuario
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${session?.user.token}`
                },
            });
        } catch (error) {
            console.error('Errores', error);
        }
    };
    return (
        <div>
            <div className="wrapper">
                <main className='main'>
                    <h2 className="titulo-principal">Carrito</h2>
                    {carrito.map((cart) => (
                        <div className="contenedor-carrito">

                            <div className="carrito-producto">
                                <img className="carrito-producto-imagen" src={cart.productDetails?.imagenes[0].imagenURL} alt="Abrigo 01" />

                                <div className="carrito-producto-titulo">
                                    <small>Nombre</small>
                                    <h3>{cart.productDetails?.nombre}</h3>
                                </div>
                                <div className="carrito-producto-cantidad">
                                    <small>Cantidad</small>
                                    <p>{cart.cantidad}</p>
                                </div>
                                <div className="carrito-producto-precio">
                                    <small>Precio</small>
                                    <p>${cart.productDetails?.precio}</p>
                                </div>
                                <div className="carrito-producto-subtotal">
                                    <small>Subtotal</small>
                                    <p>${cart.cantidad * (cart.productDetails ? cart.productDetails.precio : 0)}</p>

                                </div>
                                <ButtonGlobal variant="contained" onClick={() => handlePedidoClick(cart)}>
                                    Hacer pedido
                                </ButtonGlobal>
                                <BootstrapTooltip title="Eliminar" placement="left">
                                    <IconButton aria-label="delete" size="large">
                                        <DeleteIcon color='error' fontSize="inherit" />
                                    </IconButton>
                                </BootstrapTooltip>

                            </div>

                            <div id="carrito-acciones" className="carrito-acciones">
                                <div className="carrito-acciones-izquierda">

                                    <button id="carrito-acciones-vaciar" className="carrito-acciones-vaciar">Vaciar carrito</button>
                                </div>
                                <div className="carrito-acciones-derecha">
                                    <div className="carrito-acciones-total">
                                        <p>Total:</p>
                                        <p id="total">$3000</p>
                                    </div>
                                    <button className="carrito-acciones-comprar">Comprar ahora</button>

                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}

export default page