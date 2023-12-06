'use client'
import { IProducto } from "@/app/models/IProducto";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import './ProductsComponent.css'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/components/TableCompuestos/SearchIcon";
import { Pagination } from "@nextui-org/react";
import { PlusIcon } from "@/app/components/TableCompuestos/PlusIcon";
import { ILike } from "@/app/models/Ilike";
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
  const [productos, setProductos] = useState<IProducto[]>([]);

  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user.token) {
        try {
          const response = await axios.get('http://localhost:8080/api/productos', {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "Authorization": `Bearer ${session.user.token}`
            },
          });

          setProductos(response.data);
        } catch (error) {
          console.error('Errores', error);
        }
      }
    };

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



  const handleCheckboxChange = async (idProducto: number) => {
    try {
      if (likes.includes(idProducto)) {
        // Si el producto ya le gusta, realiza una solicitud para quitar el like
        await axios.delete(`http://localhost:8080/api/likes?id_Producto=${idProducto}&id_Usuario=${session?.user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${session?.user.token}`
          },
        });
        // Actualiza la lista de productos que le gustan al usuario
        setLikes(likes.filter(like => like !== idProducto));
      } else {
        // Si el producto no le gusta, realiza una solicitud para darle like
        const idUsuario = session?.user.id;
        const fecha = obtenerFecha();
        const hora = obtenerHora();

        await axios.post('http://localhost:8080/api/likes', {
          idProducto,
          idUsuario,
          fecha,
          hora,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${session?.user.token}`
          },
        });
        // Actualiza la lista de productos que le gustan al usuario
        setLikes([...likes, idProducto]);
      }
    } catch (error) {
      console.error('Errores', error);
    }
  }

  const [likes, setLikes] = useState<number[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (session?.user.token) {
        try {
          const response = await axios.get<ILike[]>(`http://localhost:8080/api/likes/by-user/${session.user.id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "Authorization": `Bearer ${session.user.token}`
            },
          });

          setLikes(response.data.map(like => like.idProducto));
        } catch (error) {
          console.error('Error al obtener los productos que le gustan al usuario:', error);
        }
      }
    };

    fetchLikes();
  }, [session]);

  const filteredProductos = (): IProducto[] => {

    if (search.length === 0)
      return productos.slice(currentPage, currentPage + 8);

    // Si hay algo en la caja de texto
    const filtered = productos.filter(producto => producto.nombre.includes(search));
    return filtered.slice(currentPage, currentPage + 8);
  }
  const totalPages = Math.ceil(
    productos.filter((producto) => producto.nombre.includes(search)).length / 8
  );

  const nextPage = () => {
    if (productos.filter(producto => producto.nombre.includes(search)).length > currentPage + 8)
      setCurrentPage(currentPage + 8);
  }

  const prevPage = () => {
    if (currentPage > 0)
      setCurrentPage(currentPage - 8);
  }

  //Regresa a la página inicial
  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  }
  return (
    <>
      <section className="container top-products mt-4">
        <h1 className="heading-1">Productos</h1>

        <div className="flex justify-between gap-3" style={{ padding: '0 20px' }}>
          <Input
            type="text"
            className="w-full  sm:max-w-[44%]"
            placeholder="Buscar producto"
            value={search}
            onChange={onSearchChange}
            startContent={<SearchIcon />}
          />

        </div>
        <div className="flex w-full justify-center">

          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={currentPage / 8 + 1}
            total={totalPages}
            onChange={(newPage) => setCurrentPage((newPage - 1) * 8)}
          />
        </div>

        <div className="container-products">
          {filteredProductos().map((producto: IProducto) => (

            <div className="card-product" key={producto.id}>
              <div className="container-img-pageProducts">
                <img src={producto.imagenes[0].imagenURL} alt="Cafe Irish" />
                <div className="button-group">
                  <BootstrapTooltip title="Me gusta" placement="left">
                    <div className='span-content'>
                      <label className="ui-like">
                        <input type="checkbox"
                          checked={likes.includes(producto.id)}
                          onChange={() => handleCheckboxChange(producto.id)} />
                        <div className="like">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg>
                        </div>
                      </label>
                    </div>
                  </BootstrapTooltip>

                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <div className="star-rating-group">
                    {[...Array(10)].map((_, index) => {
                      const starValue = (index + 1) / 2;
                      const inputId = `rating2-${producto.id}-${index + 1}`; // Utilizar el ID del producto
                      return (
                        <React.Fragment key={index}>
                          <label aria-label={`${starValue} stars`} className={`star-rating-label${starValue % 1 === 0 ? '' : ' star-rating-label--half'}`} htmlFor={inputId}>
                            {starValue % 1 === 0 ? <i className="star-rating-icon star-rating-icon--filled fa fa-star"></i> : <i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i>}
                          </label>
                          <input className="star-rating-input" name={`rating2-${producto.id}`} id={inputId} value={starValue} type="radio" checked={starValue === producto?.evaluacion} disabled />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <h3><Link href={`/DetallesProducto/${producto.id}`}>{producto.nombre}</Link></h3>

                <BootstrapTooltip title="Ver producto" placement="left">
                  <Link href={`/DetallesProducto/${producto.id}`} className="add-cart">
                    <span className="material-symbols-outlined">
                      storefront
                    </span>
                  </Link>
                </BootstrapTooltip>

                <p className="price">{producto.precio}</p>
              </div>
            </div>
          ))}

        </div>
        <div className="flex w-full justify-center">

          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={currentPage / 8 + 1}
            total={totalPages}
            onChange={(newPage) => setCurrentPage((newPage - 1) * 8)}
          />
        </div>
      </section>
    </>
  )
}

export default page