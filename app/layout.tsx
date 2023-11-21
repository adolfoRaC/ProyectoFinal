import type { Metadata } from 'next'

import NavHeaderComponent from './components/Nav/NavHeaderComponent'
import './global.css'
import FooterComponent from './components/Footer/FooterComponent'


export const metadata: Metadata = {
  title: 'Pre-app Coffee',
  description: 'Página de pruebas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
      <link rel="stylesheet"href="https://fonts.googleapis.com/icon?family=Material+Icons"/>  
      <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>

      <body >
        <NavHeaderComponent></NavHeaderComponent>
        {children}
        <FooterComponent></FooterComponent>
      </body>
    </html>
  )
}
