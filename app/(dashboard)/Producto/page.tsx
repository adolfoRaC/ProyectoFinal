'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import './Producto.css'
import { initialize } from 'next/dist/server/lib/render-server';

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

    const settings = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
        setContador(contador + 1);
    };

    // Función para disminuir el contador
    const disminuirContador = () => {
        // Verifica que el contador no sea igual a 0 antes de disminuirlo
        if (contador > 1) {
            setContador(contador - 1);
        }
    };


    return (
        <>
            <div className='container-product'>

                <div className="container-title">Cafe caramel</div>

                <main>
                    <div className="container-img-princ">
                        <div className='select-img'>
                            <div className="container-img ">
                                <Image src={selectedImage} alt="imagen-producto" width={400} height={400} />
                            </div>
                        </div>
                        <div className='slider-img'>
                            <Slider className='container-img' {...settings}>
                                {images.map((img, index) => (
                                    <div className="container-img " key={index} onClick={() => handleImageClick(index)}>
                                        <Image className='image-slider' src={img} alt={`small-image-${index + 1}`} width={400} height={400} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="small-images">
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
                        <div style={{all: 'initial'}} className="bxx-text">
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
                <div className='box-review'>
                    <p>
                        Lorem,explicabo mollitia laboriosam incidunt ipsa! Quaerat, exercitationem adipisci quibusdam consectetur corporis nam pariatur. Ipsa deserunt eaque esse.
                    </p>
                    <div className='in-box'>
                        <div className="bx-img">
                            <img src="https://app.bipeek.com/storage/9411/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg?v=1636378269" alt="" />
                        </div>
                        <div style={{all: 'initial'}} className="bxx-text">
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
                <div className='box-review'>
                    <p>
                        Lorem,explicabo mollitia laboriosam incidunt ipsa! Quaerat, exercitationem adipisci quibusdam consectetur corporis nam pariatur. Ipsa deserunt eaque esse.
                    </p>
                    <div className='in-box'>
                        <div className="bx-img">
                            <img src="https://app.bipeek.com/storage/9411/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg?v=1636378269" alt="" />
                        </div>
                        <div style={{all: 'initial'}} className="bxx-text">
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
                <div className='box-review'>
                    <p>
                        Lorem,explicabo mollitia laboriosam incidunt ipsa! Quaerat, exercitationem adipisci quibusdam consectetur corporis nam pariatur. Ipsa deserunt eaque esse.
                    </p>
                    <div className='in-box'>
                        <div className="bx-img">
                            <img src="https://app.bipeek.com/storage/9411/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg?v=1636378269" alt="" />
                        </div>
                        <div style={{all: 'initial'}} className="bxx-text">
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
                <div className='box-review'>
                    <p>
                        Lorem,explicabo mollitia laboriosam incidunt ipsa! Quaerat, exercitationem adipisci quibusdam consectetur corporis nam pariatur. Ipsa deserunt eaque esse.
                    </p>
                    <div className='in-box'>
                        <div className="bx-img">
                            <img src="https://app.bipeek.com/storage/9411/2e4566fd829bcf9eb11ccdb5f252b02f.jpeg?v=1636378269" alt="" />
                        </div>
                        <div style={{all: 'initial'}} className="bxx-text">
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