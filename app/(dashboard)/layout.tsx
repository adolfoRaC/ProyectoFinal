
import NavHeaderComponent from '../components/Nav/NavHeaderComponent'
import FooterComponent from '../components/Footer/FooterComponent'
import SessionContextGlobal from '../context/SessionContext'
const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <SessionContextGlobal>
        <NavHeaderComponent></NavHeaderComponent>
        {children}
        <FooterComponent></FooterComponent>
      </SessionContextGlobal>
    </div>
  )
}

export default layout