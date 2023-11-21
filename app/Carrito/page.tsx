'use client'
import React from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import './Carrito.css'

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
const page = () => {
    return (
        <div>
            <div className="wrapper">
                <main className='main'>
                    <h2 className="titulo-principal">Carrito</h2>
                    <div className="contenedor-carrito">
                        <div className="carrito-producto">
                            <img className="carrito-producto-imagen" src="https://www.costco.com.mx/medias/sys_master/products/h56/hc1/61956390256670.jpg" alt="Abrigo 01" />

                            <div className="carrito-producto-titulo">
                                <small>Título</small>
                                <h3>Abrigo 01</h3>
                            </div>
                            <div className="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>1</p>
                            </div>
                            <div className="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$1000</p>
                            </div>
                            <div className="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$1000</p>
                            </div>
                            <BootstrapTooltip title="Eliminar" placement="left">
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon color='error' fontSize="inherit" />
                                </IconButton>
                            </BootstrapTooltip>
                            {/* <button className="carrito-producto-eliminar" id="abrigo-01"><i className="bi bi-trash-fill"></i></button> */}
                        </div>

                        <div className="carrito-producto">
                            <img className="carrito-producto-imagen" src="https://www.costco.com.mx/medias/sys_master/products/h56/hc1/61956390256670.jpg" alt="Abrigo 01" />

                            <div className="carrito-producto-titulo">
                                <small>Título</small>
                                <h3>Abrigo 01</h3>
                            </div>
                            <div className="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>1</p>
                            </div>
                            <div className="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$1000</p>
                            </div>
                            <div className="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$1000</p>
                            </div>
                            <BootstrapTooltip title="Eliminar" placement="left">
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon color='error' fontSize="inherit" />
                                </IconButton>
                            </BootstrapTooltip>
                            {/* <button className="carrito-producto-eliminar" id="abrigo-01"><i className="bi bi-trash-fill"></i></button> */}
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

                        <p id="carrito-comprado" className="carrito-comprado disabled">Muchas gracias por tu compra. <i className="bi bi-emoji-laughing"></i></p>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default page