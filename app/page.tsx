import React from 'react'
import BannerComponent from './components/Banner/BannerComponent'
import FeaturesComponent from './components/Features/FeaturesComponent'
import CategoriesComponent from './components/Categories/CategoriesComponent'
import ProductsComponent from './components/Products/ProductsComponent'
import TiendaComponent from './components/Tiedas/TiendaComponent'
const page = () => {
  return (
    <>
      <BannerComponent></BannerComponent>
    <div className='main-content'>
      <FeaturesComponent></FeaturesComponent>
      <CategoriesComponent></CategoriesComponent>
      <ProductsComponent></ProductsComponent>
      <TiendaComponent></TiendaComponent>
    </div>
    </>
  )
}

export default page