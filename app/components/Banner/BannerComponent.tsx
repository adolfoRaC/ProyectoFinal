import Link from 'next/link';
import './BannerComponent.css';
const BannerComponent = () => {
  return (
    <section className="banner">
    <div className="content-banner">
        <p>Café Delicioso</p>
        <h2>100% Natural <br />Café Fresco</h2>
        <Link href="#">Comprar ahora</Link>
    </div>
</section>
  )
}

export default BannerComponent