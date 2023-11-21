import './TiendaComponent.css'
const TiendaComponent = () => {
	return (
		<section className="container tiendas">
			<h1 className="heading-1">Tiendas</h1>

			<div className="container-tiendas">
				<div className="card-tienda">
					<div className="container-img">
						<img src="/images/blog-1.jpg" alt="Imagen Tienda 1" />
						<div className="button-group-tienda">
							<div className='span-content'>
								<span className="material-symbols-outlined">
									search
								</span>
							</div>
							<div className='span-content'>
								<span className="material-symbols-outlined">
									link
								</span>
							</div>
						</div>
					</div>
					<div className="content-tienda">
						<h3>Lorem, ipsum dolor sit</h3>
						<span>29 Noviembre 2022</span>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Iste, molestiae! Ratione et, dolore ipsum
							quaerat iure illum reprehenderit non maxime amet dolor
							voluptas facilis corporis, consequatur eius est sunt
							suscipit?
						</p>
						<div className="btn-read-more">Leer más</div>
					</div>
				</div>
				<div className="card-tienda">
					<div className="container-img">
						<img src="/images/blog-2.jpg" alt="Imagen Tienda 2" />
						<div className="button-group-tienda">
							<div className='span-content'>
								<span className="material-symbols-outlined">
									search
								</span>
							</div>
							<div className='span-content'>
								<span className="material-symbols-outlined">
									link
								</span>
							</div>
						</div>
					</div>
					<div className="content-tienda">
						<h3>Lorem, ipsum dolor sit</h3>
						<span>29 Noviembre 2022</span>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Iste, molestiae! Ratione et, dolore ipsum
							quaerat iure illum reprehenderit non maxime amet dolor
							voluptas facilis corporis, consequatur eius est sunt
							suscipit?
						</p>
						<div className="btn-read-more">Leer más</div>
					</div>
				</div>
				<div className="card-tienda">
					<div className="container-img">
						<img src="/images/blog-3.jpg" alt="Imagen Tienda 3" />
						<div className="button-group-tienda">
							<div className='span-content'>
								<span className="material-symbols-outlined">
									search
								</span>
							</div>
							<div className='span-content'>
								<span className="material-symbols-outlined">
									link
								</span>
							</div>
						</div>
					</div>
					<div className="content-tienda">
						<h3>Lorem, ipsum dolor sit</h3>
						<span>29 Noviembre 2022</span>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Iste, molestiae! Ratione et, dolore ipsum
							quaerat iure illum reprehenderit non maxime amet dolor
							voluptas facilis corporis, consequatur eius est sunt
							suscipit?
						</p>
						<div className="btn-read-more">Leer más</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TiendaComponent