'use client'
import React, { useEffect, useState } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import axios from "axios";
import { styled } from '@mui/material/styles';
import ITienda from '../../models/ITienda';
import './TiendaComponent.css'
import Swal from 'sweetalert2';
import { useSession, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [tiendas, setTiendas] = useState<ITienda[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user.token) {
        try {
          const response = await axios.get<ITienda[]>('http://localhost:8080/api/tiendas', {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "Authorization": `Bearer ${session.user.token}`
            },
          });

          setTiendas(response.data);
        } catch (error) {
          console.error('Error al obtener las tiendas:', error);
        }
      };
    }
    fetchData();
  }, [session]);



  return (
    <section className="container tiendas">
      <h1 className="heading-1">Tiendas</h1>

      <div className="container-tiendas">
        {tiendas.map((tienda) => (
          <div className="card-tienda" key={tienda.id}>
            <div className="container-img">
              <img src="/images/blog-1.jpg" alt={`Imagen ${tienda.nombre}`} />
              <div className="button-group-tienda">
                <div className='span-content'>
                  <span className="material-symbols-outlined">
                    link
                  </span>
                </div>
              </div>
            </div>
            <div className="content-tienda">
              <h2>{tienda.nombre}</h2>
              <span>
                <b>Correo: </b>{tienda.propietario.correo_Electronico} <br />
                <b>Contacto: </b> {tienda.telefono}
              </span>

              <p>
                <span>
                  <b>Dirección: </b>
                </span>
                {tienda.direccion.calle}, {tienda.direccion.numero}<br />
                {tienda.direccion.colonia}, {tienda.direccion.municipio.municipio}, {tienda.direccion.estado.estado}
              </p>
              <div className="btn-read-more">Leer más</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default page