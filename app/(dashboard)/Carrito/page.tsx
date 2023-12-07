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
import { ICarritoPedido } from '@/app/models/ICarritoPedido';
import { IProducto } from '@/app/models/IProducto';
import ITienda from '@/app/models/ITienda';
import { IPedido } from '@/app/models/IPedido';
import Swal from 'sweetalert2';
import { fetchData } from 'next-auth/client/_utils';

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
    const [carrito, setCarrito] = useState<ICarritoPedido[]>([]);
    const [tiendas, setTiendas] = useState<ITienda[]>([]);
    const [totalTienda, setTotalTienda] = useState<number>(0);
    const [detallesPedido, setDetallesPedido] = useState<{ precio: number, cantidad: number, idProducto: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user.token) {
                try {
                    const response = await axios.get<ICarrito[]>(`http://localhost:8080/api/carrito/${session.user.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${session.user.token}`
                        },
                    });

                    const tiendasPromises = response.data.map(async (cartItem) => {
                        const productDetailsResponse = axios.get<IProducto>(`http://localhost:8080/api/productos/${cartItem.idProducto}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                "Authorization": `Bearer ${session.user.token}`
                            },
                        });

                        const tiendaResponse = axios.get<ITienda>(`http://localhost:8080/api/tiendas/${cartItem.idTienda}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                "Authorization": `Bearer ${session.user.token}`
                            },
                        });

                        const [productDetails, tienda] = await Promise.all([productDetailsResponse, tiendaResponse]);

                        return {
                            ...cartItem,
                            productDetails: productDetails.data,
                            tienda: tienda.data
                        };
                    });

                    const detailedCart = await Promise.all(tiendasPromises);
                    setCarrito(detailedCart);
                    const tiendasData = detailedCart.map(item => item.tienda);
                    setTiendas(tiendasData);

                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            }
        };

        fetchData();
    }, [session]);

    const handleEliminarCarrito = async (idCarritoToDelete: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/carrito/${idCarritoToDelete}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${session?.user.token}`
                },
            });
            setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== idCarritoToDelete));
            // Puedes realizar otras acciones después de eliminar el carrito, si es necesario
        } catch (error) {
            console.error('Error al eliminar el carrito:', error);
        }
    };


    const handleCompraClick = async (productosDeTienda: any, idTienda: any) => {
        const confirmacion = await Swal.fire({
            icon: 'question',
            title: '¿Confirmar pedido?',
            text: '¿Estás seguro de que deseas realizar este pedido?',
            showCancelButton: true,
            confirmButtonColor: '#4D8B55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, realizar pedido',
            cancelButtonText: 'Cancelar',
        });

        if (confirmacion.isConfirmed) {
            const pedido = {
                pedido: {
                    id: 0,
                    fecha: null,
                    hora: null,
                    idEstatus: 3,
                    idCliente: session?.user.id,
                    idTienda: parseInt(idTienda),
                },
                detallesPedido: productosDeTienda.map((cartItem: any) => ({
                    id: 0,
                    precio: cartItem.productDetails?.precio * cartItem.cantidad || 0,
                    cantidad: cartItem.cantidad,
                    idProducto: cartItem.idProducto,
                    idPedido: 0,
                })),
            };

            try {
                await axios.post<IPedido>('http://localhost:8080/api/pedidos', pedido, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        "Authorization": `Bearer ${session?.user.token}`
                    },
                });
                const updatedCarrito = carrito.filter(item => !productosDeTienda.includes(item));
                setCarrito(updatedCarrito);

                Swal.fire({
                    icon: 'success',
                    title: '¡Pedido realizado!',
                    text: 'Tu pedido se ha realizado con éxito.',
                });

            } catch (error) {
                console.error('Errores', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al realizar el pedido. Por favor, inténtalo de nuevo.',
                });
            }
        }
    };





    const tiendasConProductos: { [idTienda: number]: ICarritoPedido[] } = {};
    carrito.forEach((cartItem) => {
        const idTienda = cartItem.idTienda;

        if (!tiendasConProductos[idTienda]) {
            tiendasConProductos[idTienda] = [];
        }

        tiendasConProductos[idTienda].push(cartItem);
    });
    const tiendasConTotales = Object.keys(tiendasConProductos).map((idTienda) => {
        const productosDeTienda = tiendasConProductos[parseInt(idTienda, 10)];
        const tienda = tiendas.find((t) => t.id === parseInt(idTienda, 10));

        // Calcular el costo total de la tienda
        const costoTotalTienda = productosDeTienda.reduce((total, producto) => {
            const subtotalProducto = producto.cantidad * (producto.productDetails ? producto.productDetails.precio : 0);
            return total + subtotalProducto;
        }, 0);

        return {
            idTienda,
            productosDeTienda,
            tienda,
            costoTotalTienda,
        };
    });
    return (

        <div>
            <div className="wrapper">
                <h2 className="titulo-carrito">Carrito</h2>
                {Object.keys(tiendasConProductos).length === 0 ? (
                    <h2 style={{height: '20rem', textAlign:'center', justifyContent:'center'}} className="titulo-principal">Sin productos en el carrito</h2>
                ) : (
                tiendasConTotales.map(({ idTienda, productosDeTienda, tienda, costoTotalTienda }) => (
                    <main key={idTienda} className='main'>
                        <div className="contenedor-carrito">
                            <h2 className="titulo-principal">Tienda: {tienda?.nombre}</h2>
                        {productosDeTienda.map((cartItem) => (
                                <div key={cartItem.id} className="carrito-producto">
                                    <img className="carrito-producto-imagen" src={cartItem.productDetails?.imagenes[0].imagenURL} alt="Abrigo 01" />
                                    <div className="carrito-producto-titulo">
                                        <small>Nombre</small>
                                        <h3>{cartItem.productDetails?.nombre}</h3>
                                    </div>
                                    <div className="carrito-producto-cantidad">
                                        <small>Cantidad</small>
                                        <p>{cartItem.cantidad}</p>
                                    </div>
                                    <div className="carrito-producto-precio">
                                        <small>Precio</small>
                                        <p>${cartItem.productDetails?.precio}</p>
                                    </div>
                                    <div className="carrito-producto-subtotal">
                                        <small>Subtotal</small>
                                        <p>${cartItem.cantidad * (cartItem.productDetails ? cartItem.productDetails?.precio : 0)}</p>
                                    </div>
                                    <BootstrapTooltip onClick={() => handleEliminarCarrito(cartItem.id ? cartItem.id : "")} title="Eliminar" placement="left">
                                        <IconButton aria-label="delete" size="large">
                                            <DeleteIcon color='error' fontSize="inherit" />
                                        </IconButton>
                                    </BootstrapTooltip>
                                </div>
                            ))}

                        </div>

                        <div id="carrito-acciones" className="carrito-acciones">

                            <div className="carrito-acciones-derecha">
                                <div className="carrito-acciones-total">
                                    <p>Total:</p>
                                    <p id="total">${costoTotalTienda}</p>
                                </div>
                                <button
                                    onClick={() => handleCompraClick(productosDeTienda, idTienda)}
                                    className="carrito-acciones-comprar">Comprar ahora</button>
                            </div>
                        </div>
                    </main>
                    ))
                    )}

            </div>
        </div>

    )
}

export default page