

import './usuarioGlobal.css'
const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
      <div className="content-page-user">
        {children}
      </div>
  )
}

export default layout