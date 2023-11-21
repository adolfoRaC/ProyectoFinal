import './ProductsComponent.css'

const ProductsComponent = () => {
  return (
    <section className="container top-products">
      <h1 className="heading-1">Mejores Productos</h1>

      <div className="container-options">
        <span className="active">Destacados</span>
        <span>Más recientes</span>
        <span>Mejores Vendidos</span>
      </div>

      <div className="container-products">
        {/* Producto 1 */}
        <div className="card-product">
          <div className="container-img">
            <img src="/images/cafe-product-1.png" alt="Cafe Irish" />
            <div className="button-group">
              <div className='span-content'>
                <span className="material-symbols-outlined">
                  visibility
                </span>
              </div>
              <div className='span-content'>
                <label className="ui-like">
                  <input type="checkbox" />
                  <div className="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg>
                  </div>
                </label>
              </div>
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
                <input className="star-rating-input" name="rating2" id="rating2-35" value="3.5" type="radio" checked disabled/>
                <label aria-label="4 stars" className="star-rating-label" htmlFor="rating2-40"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                <label aria-label="4.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-45"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
              </div>
            </div>
            <h3>Cafe Irish</h3>
            <span className="add-cart">
              <span className="material-symbols-outlined">
                storefront
              </span>
            </span>
            <p className="price">$4.60</p>
          </div>
        </div>
        {/* Producto 2  */}
        <div className="card-product">
          <div className="container-img">
            <img
              src="https://chedrauimx.vtexassets.com/arquivos/ids/21966437-800-auto?v=638350898081630000&width=800&height=auto&aspect=true"
              alt="Cafe incafe-ingles.jpg"
            />

            <div className="button-group">
              <div className='span-content'>
                <span className="material-symbols-outlined">
                  visibility
                </span>
              </div>
              <div className='span-content'>
                <label className="ui-like">
                  <input type="checkbox" />
                  <div className="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="content-card-product">
            <div className="stars">
              <div id="half-stars-example">
                <div className="star-rating-group">
                  <input className="star-rating-input star-rating-input--empty" checked name="rating2" id="rating2-0" value="0" type="radio" />
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
                  <input className="star-rating-input" name="rating2" id="rating2-50" value="5" type="radio" checked />
                </div>
              </div>
            </div>
            <h3>Cafe Inglés</h3>
            <span className="add-cart">
              <span className="material-symbols-outlined">
                storefront
              </span>
            </span>
            <p className="price">$5.70</p>
          </div>
        </div>
        {/* Producto 3 */}
        <div className="card-product">
          <div className="container-img">
            <img
              src="https://m.media-amazon.com/images/I/61oDqRIQc2L.__AC_SX300_SY300_QL70_ML2_.jpg"
              alt="Cafe Australiano"
            />
            <div className="button-group">
              <div className='span-content'>
                <span className="material-symbols-outlined">
                  visibility
                </span>
              </div>
              <div className='span-content'>
                <label className="ui-like">
                  <input type="checkbox" />
                  <div className="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="content-card-product">
            <div className="stars">
              <div id="half-stars-example">
                <div className="star-rating-group">
                  <input className="star-rating-input star-rating-input--empty" checked name="rating2" id="rating2-0" value="0" type="radio" />
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
                  <input className="star-rating-input" name="rating2" id="rating2-45" value="4.5" type="radio" checked />
                  <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                  <input className="star-rating-input" name="rating2" id="rating2-50" value="5" type="radio" />
                </div>
              </div>
            </div>
            <h3>Cafe Australiano</h3>
            <span className="add-cart">
              <span className="material-symbols-outlined">
                storefront
              </span>
            </span>
            <p className="price">$3.20</p>
          </div>
        </div>
        {/* Producto 4 */}
        <div className="card-product">
          <div className="container-img">
            <img src="https://ahcacao.com/web/image/product.product/562/image_1024/Caf%C3%A9%20de%20Chiapas%2C%20Conservation%20Trade%2C%20Grano%20Entero%2C%20450g?unique=07b71e3" alt="Cafe Helado" />
            <div className="button-group">
              <div className='span-content'>
                <span className="material-symbols-outlined">
                  visibility
                </span>
              </div>
              <div className='span-content'>
                <label className="ui-like">
                  <input type="checkbox" />
                  <div className="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=""><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path></g></svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="content-card-product">
            <div className="stars">

              <div className="star-rating-group">
                <input className="star-rating-input star-rating-input--empty" checked name="rating2" id="rating2-0" value="0" type="radio" />
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
                <input className="star-rating-input" name="rating2" id="rating2-25" value="2.5" type="radio"  />
                <label aria-label="3 stars" className="star-rating-label" htmlFor="rating2-30"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                <input className="star-rating-input" name="rating2" id="rating2-30" value="3" type="radio" />
                <label aria-label="3.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-35"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                <input className="star-rating-input" name="rating2" id="rating2-35" value="3.5" type="radio" checked/>
                <label aria-label="4 stars" className="star-rating-label" htmlFor="rating2-40"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                <input className="star-rating-input" name="rating2" id="rating2-40" value="4" type="radio" />
                <label aria-label="4.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-45"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                <input className="star-rating-input" name="rating2" id="rating2-45" value="4.5" type="radio" />
                <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                <input className="star-rating-input" name="rating2" id="rating2-50" value="5" type="radio" />
              </div>

            </div>
            <h3>Cafe Helado</h3>
            <div className="add-cart">
              <span className="material-symbols-outlined">
                storefront
              </span>
            </div>
            <p className="price">$5.60</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsComponent