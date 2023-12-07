'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import './Producto.css'
import { initialize } from 'next/dist/server/lib/render-server';
import axios from "axios";
import { IProducto } from "@/app/models/IProducto";
import { useSession, signOut } from "next-auth/react";
import CargaComponent from '@/app/components/Carga/CargaComponent';
import ITienda from '@/app/models/ITienda';
import { IDisponibilidad } from '@/app/models/IDisponibilidad';
import Swal from 'sweetalert2';
import { ICarrito } from '@/app/models/ICarrito';
import { json } from 'stream/consumers';
import { IVisita } from '@/app/models/IVisita';
export interface Props {
    params: { idp: number }
}
const page = ({ params }: Props) => {
    const { data: session, status } = useSession();
    const [producto, setProducto] = useState<IProducto | null>(null);
    const [tiendas, setTiendas] = useState<ITienda[]>([]);
    const [stocks, setStocks] = useState<IDisponibilidad[] | null>(null);
    const [stock, setStock] = useState<number | null>(null);


    const [selectedImage, setSelectedImage] = useState<string>(
        'https://m.media-amazon.com/images/I/719n0Nx0JsL.__AC_SX300_SY300_QL70_ML2_.jpg'

    );
    const images = producto?.imagenes.map((imagen) => imagen.imagenURL) || [];
    useEffect(() => {
        const fetchData = async () => {
            if (session?.user.token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/productos/${params.idp}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${session.user.token}`
                        },
                    });
                    setProducto(response.data);
                    setRegistro({
                        ...registro,
                        ["idProducto"]: response.data.id,
                    });
                    if (response.data?.imagenes && response.data.imagenes.length > 0) {
                        setSelectedImage(response.data.imagenes[0].imagenURL);
                    }
                    const responsedisp = await axios.get(`http://localhost:8080/api/disponibilidadProductos/b-producto/${params.idp}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${session.user.token}`
                        },
                    });
                    // console.log(responsedisp.data);
                    setStocks(responsedisp.data);

                    const tiendasData = await Promise.all(responsedisp.data.map((item: IDisponibilidad) => {
                        return axios.get(`http://localhost:8080/api/tiendas/${item.idTienda}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                "Authorization": `Bearer ${session.user.token}`
                            }
                        });
                    }));

                    const tiendasDataFormatted = tiendasData.map((response) => response.data);
                    setTiendas(tiendasDataFormatted);
                    const localStorageKey = 'solicitudRealizada';

                    // Verifica si la solicitud ya se ha realizado antes.
                    const solicitudYaRealizada = localStorage.getItem(localStorageKey);

                    if (!solicitudYaRealizada) {
                        // Realizar solicitud de visitas solo si no se ha realizado antes
                        const fechaActual = new Date();
                        const fechaFormateada = fechaActual.toISOString().split('T')[0];
                        const horaFormateada = fechaActual.toLocaleTimeString();

                        const reg = {
                            idProducto: response.data.id,
                            idUsuario: session?.user.id,
                            fecha: fechaFormateada,
                            hora: horaFormateada,
                        };

                        try {
                            await axios.post<IVisita>('http://localhost:8080/api/visitas', reg, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    Authorization: `Bearer ${session?.user.token}`,
                                },
                            });

                            console.log('Solicitud de visita realizada con éxito.');
                            // Almacena un indicador en localStorage para recordar que la solicitud ya se realizó.
                            localStorage.setItem(localStorageKey, 'true');
                        } catch (error) {
                            console.error('Error al realizar la solicitud de visita:', error);
                            // Puedes manejar errores aquí.
                        }
                    } else {
                        console.log('La solicitud ya se realizó antes, no es necesario hacerlo de nuevo.');
                    }
                } catch (error) {
                    console.error('Errores', error);
                }
            }
        };

        fetchData();
    }, [session]);


    const onChangeTienda = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegistro({
            ...registro,
            ["idTienda"]: parseInt(value),
        });
        let v = stocks?.find((x) => x.idTienda == parseInt(value));
        if (v != null) {
            setStock(v?.stock);
        }

    }
    // const [selectedImage, setSelectedImage] = useState<string>(
    //     'https://m.media-amazon.com/images/I/719n0Nx0JsL.__AC_SX300_SY300_QL70_ML2_.jpg'

    // );

    // const images = [
    //     'https://m.media-amazon.com/images/I/719n0Nx0JsL.__AC_SX300_SY300_QL70_ML2_.jpg',
    //     'https://m.media-amazon.com/images/I/71gx8QIY1TL._AC_SL1500_.jpg',
    //     'https://m.media-amazon.com/images/I/71u-8+KesDL._AC_SL1500_.jpg',
    //     'https://m.media-amazon.com/images/I/71ot8Dno2UL._AC_SL1500_.jpg',

    // ];

    const settings = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    });



    const handleImageClick = (index: number) => {
        setSelectedImage(images[index]);
    };

    const [isDescriptiomOpen, setDescriptiomOpen] = useState(false);

    const [isDescriptiomOpen2, setDescriptiomOpen2] = useState(true);

    const [isDescriptiomOpen3, setDescriptiomOpen3] = useState(true);

    // Función para alternar la apertura y cierre del menú
    const toggleDescription = () => {
        setDescriptiomOpen(!isDescriptiomOpen);
    };

    const toggleDescription2 = () => {
        setDescriptiomOpen2(!isDescriptiomOpen2);
    };

    const toggleDescription3 = () => {
        setDescriptiomOpen3(!isDescriptiomOpen3);
    };


    const [contador, setContador] = useState(1);

    // Función para aumentar el contador
    const aumentarContador = () => {
        if (stock !== null) {
            setContador(contador < stock ? contador + 1 : 1);
        } else {
            // Manejar el caso en el que stock es null
            // Por ejemplo, puedes mostrar un mensaje de error o establecer el contador en 1
            setContador(1);
        }
    };

    // Función para disminuir el contador
    const disminuirContador = () => {
        // Verifica que el contador no sea igual a 0 antes de disminuirlo
        if (contador > 1) {
            setContador(contador - 1);
        }
    };
    const [registro, setRegistro] = useState<ICarrito>({
        idUsuario: 0,
        idTienda: 0,
        idProducto: 0,
        cantidad: 0
    });

    const handleSubmitCarrito = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let reg = { cantidad: formData.get("cantidad"), idProducto: producto?.id, idTienda: formData.get("idTienda"), idUsuario: formData.get("idUsuario") };
        // console.log(JSON.stringify(reg));
        try {
            // if()
            const response = await axios.post<ICarrito>('http://localhost:8080/api/carrito', reg,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${session?.user.token}`,
                    },
                });




            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El producto añadido al carrito.',
            });


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
    const handleRegistroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegistro({
            ...registro,
            [name]: value,
        });
    };
    const [isSliderVisible, setIsSliderVisible] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setIsSliderVisible(window.innerWidth <= 1024);
        };

        // Agregar el event listener para el cambio de tamaño de la pantalla
        window.addEventListener('resize', handleResize);

        // Llamar a la función de manejo de tamaño inicialmente
        handleResize();

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    if (!producto) {
        return <div style={{ height: '30rem' }}>
            <CargaComponent />
        </div>;
    }
    return (
        <>
            <div className='container-product'>

                <div className="container-title">{producto?.nombre}</div>

                <main className='main-detalleProducto'>
                    <div className="container-img-princ">
                        {isSliderVisible && (
                            <div className='slider-img'>
                                <Slider className='container-img' {...settings}>
                                    {images.map((img, index) => (
                                        <div className="container-img" key={index} onClick={() => handleImageClick(index)}>
                                            <Image className='image-slider' src={img} alt={`image-${index + 1}`} width={400} height={400} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <div className='select-img' style={{ display: !isSliderVisible ? 'block' : 'none' }}>
                            <div className="container-img">
                                <Image src={selectedImage} alt="imagen-producto" width={400} height={400} />
                            </div>
                        </div>
                        <div className="small-images" style={{ display: !isSliderVisible ? 'flex' : 'none' }}>
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="img-secondary"
                                    onClick={() => handleImageClick(index)}>
                                    <Image src={img} alt={`small-image-${index + 1}`} className="small-image" width={100} height={100} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-info-product">
                        <div className="container-price">
                            <span><b style={{ fontWeight: 700 }}>Precio: </b>${producto?.precio}</span>
                            <div className='visitas-product-page'>
                                <p className='valor-view'>
                                    {producto.visitas}
                                </p>
                                <span className="material-symbols-outlined">
                                    visibility
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmitCarrito}>

                            <div className="container-details-product">
                                <div className="stars"  >
                                    <div className="star-rating-group" >

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
                                    <span style={{ fontSize: '2rem', marginLeft: 5 }}>{producto.evaluacion}</span>
                                </div>
                                <div>
                                    <div className="form-group">
                                        <input hidden type="number" name="idProducto" value={producto.id} onChange={handleRegistroChange} />
                                        <input hidden type="number" name="idUsuario" value={session?.user.id} onChange={handleRegistroChange} />
                                        <label htmlFor="idTienda">Tienda</label>
                                        <select name="idTienda" id="idTienda" onChange={onChangeTienda}>
                                            <option disabled selected value="">
                                                Escoge una opción
                                            </option>
                                            {
                                                tiendas?.map((item) => (
                                                    <option value={item.id}>{item.nombre}</option>
                                                ))

                                            }
                                        </select>
                                    </div>
                                    <b style={{ fontWeight: 500 }}>Stock: </b>{stock ? stock : "Selecccione una tienda"}
                                </div>

                            </div>
                            <div className="container-add-cart">
                                <div className="container-quantity">
                                    <input
                                        type="number"
                                        placeholder="1"
                                        name='cantidad'
                                        value={contador}
                                        min="1"
                                        className="input-quantity"
                                        onChange={handleRegistroChange}
                                    />

                                    <div className="btn-increment-decrement">
                                        <span className="material-symbols-outlined" onClick={aumentarContador} id="increment"> keyboard_arrow_up</span>
                                        <span className="material-symbols-outlined" onClick={disminuirContador} id="decrement">keyboard_arrow_down</span>
                                    </div>
                                </div>

                                <button type='submit' className="btn-add-to-cart">
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                    Añadir al carrito
                                </button>
                            </div>
                        </form>

                        <div className="container-description">
                            <div className="title-description" onClick={toggleDescription}>
                                <h4>Descripción</h4>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_down
                                </span>
                            </div>
                            <div className={`text-description ${isDescriptiomOpen ? 'hidden' : ''}`}>
                                <p>
                                    {producto?.descripcion} :: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates aut ratione quia odio aliquid natus quas iure, dolor, omnis corrupti iste quaerat quasi atque veniam quisquam ea tempore blanditiis cupiditate.
                                </p>
                            </div>
                        </div>

                        <div className="container-additional-information">
                            <div className="title-additional-information" onClick={toggleDescription2}>
                                <h4>Información adicional</h4>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_down
                                </span>
                            </div>
                            <div className={`text-additional-information ${isDescriptiomOpen2 ? 'hidden' : ''}`}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur a nemo consectetur dolorum ducimus? Quisquam dolor cumque soluta, atque non eos. Dolor facere perferendis nulla necessitatibus accusamus expedita, id nihil?</p>
                            </div>
                        </div>

                        <div className="container-reviews">
                            <div className="title-reviews" onClick={toggleDescription3}>
                                <h4>Reseñas</h4>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_down
                                </span>
                            </div>
                            <div className={`text-reviews ${isDescriptiomOpen3 ? 'hidden' : ''}`}>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
            <section className='title-review-product'>
                <h2>Reseñas</h2>
            </section>
            <section className='reviews-content'>
                <div className='box-review'>
                    <p>
                        Lorem,explicabo mollitia Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt officia animi dolores totam impedit. Quo ea deleniti ad quasi repellendus veniam autem vel perspiciatis quisquam consectetur est hic, adipisci reiciendis. laboriosam incidunt ipsa! Quaerat, exercitationem adipisci quibusdam consectetur corporis nam pariatur. Ipsa deserunt eaque esse.
                    </p>
                    <div className='in-box'>
                        <div className="bx-img">
                            <img src="https://app.bipeek.com/storage/9411/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg?v=1636378269" alt="" />
                        </div>
                        <div style={{ all: 'initial' }} className="bxx-text">
                            <h4>Adolfo Ramos Cruz</h4>
                            <h5>Cafe molido</h5>
                            <div className='ratings'>
                                <div className="stars" >
                                    <div className="star-rating-group">
                                        <input className="star-rating-input star-rating-input--empty" name="rating2" id="rating2-0" value="0" type="radio" />
                                        <label aria-label="0 stars" className="star-rating-label" htmlFor="rating2-0">&nbsp;</label>
                                        <label aria-label="0.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-05"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-05" value="0.5" type="radio" />
                                        <label aria-label="1 star" className="star-rating-label" htmlFor="rating2-10" ><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-10" value="1" type="radio" />
                                        <label aria-label="1.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-15"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-15" value="1.5" type="radio" />
                                        <label aria-label="2 stars" className="star-rating-label" htmlFor="rating2-20"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-20" value="2" type="radio" />
                                        <label aria-label="2.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-25"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-25" value="2.5" type="radio" />
                                        <label aria-label="3 stars" className="star-rating-label" htmlFor="rating2-30"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-30" value="3" type="radio" />
                                        <label aria-label="3.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-35"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-35" value="3.5" type="radio" />
                                        <label aria-label="4 stars" className="star-rating-label" htmlFor="rating2-40"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-40" value="4" type="radio" />
                                        <label aria-label="4.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-45"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-45" value="4.5" type="radio" />
                                        <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-50" value="5" type="radio" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </section>
        </>
    )
}

export default page