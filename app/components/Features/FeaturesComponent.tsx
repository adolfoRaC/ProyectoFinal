import './FeaturesComponent.css'
const FeaturesComponent = () => {
    return (
        <section className="container container-features">
            <div className="card-feature">
                <span className='material-icons'>flight</span>
                <div className="feature-content">
                    <span>Envío gratuito a nivel mundial</span>
                    <p>En pedido superior a $150</p>
                </div>
            </div>
            <div className="card-feature">
                <span className='material-icons'>wallet</span>

                <div className="feature-content">
                    <span>Contrareembolso</span>
                    <p>100% garantía de devolución de dinero</p>
                </div>
            </div>
            <div className="card-feature">
                <span className="material-symbols-outlined">
                    featured_seasonal_and_gifts
                </span>
                <div className="feature-content">
                    <span>Tarjeta regalo especial</span>
                    <p>Ofrece bonos especiales con regalo</p>
                </div>
            </div>
            <div className="card-feature">
                <span className="material-symbols-outlined">
                    headset_mic
                </span>
                <div className="feature-content">
                    <span>Servicio al cliente 24/7</span>
                    <p>LLámenos 24/7 al 123-456-7890</p>
                </div>
            </div>
        </section>
    )
}

export default FeaturesComponent