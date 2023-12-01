'use client'
import { IProducto } from "@/app/models/IProducto";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import '../../components/Products/ProductsComponent.css'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

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
  useEffect(() => {
    const fetchData = async () => {
      if(session?.user.token){
      try {
        const response = await axios.get('http://localhost:8080/productos', {
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

  const handleEliminarProducto = async (idProducto: number, nombreProducto: string )=> {

    const confirmacion = await Swal.fire({
      title: `¿Estás seguro de eliminar "${nombreProducto}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4D8B55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (confirmacion.isConfirmed) {
      try {
        // Realizar la solicitud DELETE utilizando axios
        const response = await axios.delete(`http://localhost:8080/productos/${idProducto}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (response.status === 200) {
          // Eliminación exitosa, actualiza la lista de productos
          setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== idProducto));
          // Mostrar una alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: `El producto "${nombreProducto}" ha sido eliminado exitosamente.`,
          });
        } else {
          console.log('Error en la eliminación del producto:', response.data);
        }
      } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error en la solicitud:', error);
      }
    }
  };
  return (
    <>
      <section className="container top-products mt-4">
        <h1 className="heading-1">Productos</h1>
        <div className="container-products">
          {productos.map((producto: IProducto) => (

            <div className="card-product">
              <div className="container-img">
                <img src={producto.imagenes[0].imagenURL} alt="Cafe Irish" />
                <div className="button-group">
                  <BootstrapTooltip title="Actualizar" placement="left">
                    <div className='span-content'>
                      <span className="material-symbols-outlined">
                        sync_alt
                      </span>
                    </div>
                  </BootstrapTooltip>
                  <BootstrapTooltip title="Eliminar" placement="left">
                    <div className='span-content'>
                      <span className="material-symbols-outlined" onClick={() => handleEliminarProducto(producto.id, producto.nombre)}>
                        delete
                      </span>
                    </div>
                  </BootstrapTooltip>
                </div>
              </div>
              <div className="content-card-product">
                <div className="stars">
                  <div className="star-rating-group">
                    <label aria-label="0 stars" className="star-rating-label" htmlFor="rating-0">&nbsp;</label>
                    <label aria-label="0.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-05"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                    <label aria-label="1 star" className="star-rating-label" htmlFor="rating2-10" ><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                    <label aria-label="1.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-15"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                    <label aria-label="2 stars" className="star-rating-label" htmlFor="rating2-20"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                    <label aria-label="2.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-25"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                    <label aria-label="3 stars" className="star-rating-label" htmlFor="rating2-30"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                    <label aria-label="3.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-35"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                    <input className="star-rating-input" name="rating2" id="rating2-35" value="3.5" type="radio" checked disabled />
                    <label aria-label="4 stars" className="star-rating-label" htmlFor="rating2-40"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                    <label aria-label="4.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-45"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                    <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                  </div>
                </div>
                <h3>{producto.nombre}</h3>
                <BootstrapTooltip title="Añadir al carrito" placement="left">
                  <span className="add-cart">
                    <span className="material-symbols-outlined">
                      storefront
                    </span>
                  </span>
                </BootstrapTooltip>
                <p className="price">{producto.precio}</p>
              </div>
            </div>
          ))}

        </div>

      </section>
    </>
  )
}

export default page