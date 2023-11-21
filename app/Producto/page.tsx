'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import './Producto.css'

const page = () => {
    const [selectedImage, setSelectedImage] = useState<string>(
        'https://m.media-amazon.com/images/I/719n0Nx0JsL.__AC_SX300_SY300_QL70_ML2_.jpg'
    );

    const images = [
        'https://m.media-amazon.com/images/I/719n0Nx0JsL.__AC_SX300_SY300_QL70_ML2_.jpg',
        'https://m.media-amazon.com/images/I/71gx8QIY1TL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71u-8+KesDL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71ot8Dno2UL._AC_SL1500_.jpg',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


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
        setContador(contador + 1);
    };

    // Función para disminuir el contador
    const disminuirContador = () => {
        // Verifica que el contador no sea igual a 0 antes de disminuirlo
        if (contador > 1) {
            setContador(contador - 1);
        }
    };

    // Nuevo estado para controlar el tamaño de la ventana
    // const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    }, []);
    return (
        <>
            <div className='container-product'>

                <div className="container-title">Tablet</div>

                <main>
                    <div className="container-img-princ">
                        {windowWidth > 1024 ? (
                            <div className="container-img">
                                <Image src={selectedImage} alt="imagen-producto" width={400} height={400} />
                            </div>
                        ) : (
                            <Slider className='container-img' {...settings}>
                                {images.map((img, index) => (
                                    <div className="container-img" key={index} onClick={() => handleImageClick(index)}>
                                        <Image className='image-slider' src={img} alt={`small-image-${index + 1}`} width={400} height={400} />
                                    </div>
                                ))}
                            </Slider>
                        )}
                        <div className="small-images">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="img-secondary"
                                    onClick={() => handleImageClick(index)}>
                                    <Image src={img} alt={`small-image-${index + 1}`} className="small-image"  width={100} height={100}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-info-product">
                        <div className="container-price">
                            <span>$95.00</span>
                        </div>

                        <div className="container-details-product">
                            <div className="form-group">
                                <label htmlFor="colour">Color</label>
                                <select name="colour" id="colour">
                                    <option disabled selected value="">
                                        Escoge una opción
                                    </option>
                                    <option value="rojo">Rojo</option>
                                    <option value="blanco">Blanco</option>
                                    <option value="beige">Beige</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="size">Talla</label>
                                <select name="size" id="size">
                                    <option disabled selected value="">
                                        Escoge una opción
                                    </option>
                                    <option value="40">40</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                </select>
                            </div>
                        </div>

                        <div className="container-add-cart">
                            <div className="container-quantity">
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={contador}
                                    min="1"
                                    className="input-quantity"
                                />
                                <div className="btn-increment-decrement">
                                    <span className="material-symbols-outlined" onClick={aumentarContador} id="increment"> keyboard_arrow_up</span>
                                    <span className="material-symbols-outlined" onClick={disminuirContador} id="decrement">keyboard_arrow_down</span>
                                </div>
                            </div>
                            <button className="btn-add-to-cart">
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                Añadir al carrito
                            </button>
                        </div>

                        <div className="container-description">
                            <div className="title-description" onClick={toggleDescription}>
                                <h4>Descripción</h4>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_down
                                </span>
                            </div>
                            <div className={`text-description ${isDescriptiomOpen ? 'hidden' : ''}`}>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing
                                    elit. Laboriosam iure provident atque voluptatibus
                                    reiciendis quae rerum, maxime placeat enim cupiditate
                                    voluptatum, temporibus quis iusto. Enim eum qui delectus
                                    deleniti similique? Lorem, ipsum dolor sit amet
                                    consectetur adipisicing elit. Sint autem magni earum est
                                    dolorem saepe perferendis repellat ipsam laudantium cum
                                    assumenda quidem quam, vero similique? Iusto officiis
                                    quod blanditiis iste?
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
                </main>
            </div>
        </>
    )
}

export default page