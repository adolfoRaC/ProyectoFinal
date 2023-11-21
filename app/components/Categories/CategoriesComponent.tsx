import React from 'react'
import './CategoriesComponent.css'
// import './images'
const CategoriesComponent = () => {
  return (
    <section className="container top-categories">
    <h1 className="heading-1">Mejores Categorías</h1>
    <div className="container-categories">
        <div className="card-category category-liberica">
            <p>Café libérica</p>
            <span>Ver más</span>
        </div>
        <div className="card-category category-robusta">
            <p>Café robusta</p>
            <span>Ver más</span>
        </div>
        <div className="card-category category-arabica">
            <p>Café arábica</p>
            <span>Ver más</span>
        </div>
    </div>
</section>
  )
}

export default CategoriesComponent