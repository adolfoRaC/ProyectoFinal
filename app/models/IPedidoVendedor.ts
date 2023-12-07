interface Estado {
    id: number;
    estatus: string;
  }
  
  interface Rol {
    id: number;
    rol: string;
  }
  
  interface Municipio {
    id: number;
    municipio: string;
    idEstado: number;
  }
  
  interface Estado {
    id: number;
    estado: string;
  }
  
  interface Direccion {
    id: number;
    calle: string;
    numero: number;
    colonia: string;
    CP: number;
    municipio: Municipio;
    estado: Estado;
  }
  
  interface Propietario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
    telefono: string;
    rol: Rol;
  }
  
  interface Tienda {
    id: number;
    nombre: string;
    correoElectronico: string;
    telefono: string;
    propietario: Propietario;
    direccion: Direccion;
  }
  
  interface RolCliente {
    id: number;
    rol: string;
  }
  
  interface Cliente {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
    telefono: string;
    rol: RolCliente;
  }
  
  interface Imagen {
    id: number;
    imagenURL: string;
    idProducto: number;
  }
  
  interface Categoria {
    id: number;
    categoria: string;
  }
  
  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    visualizacion: boolean;
    categoria: Categoria;
    imagenes: Imagen[];
    likes: number;
    visitas: number;
    evaluacion: number;
  }
  
  interface DetallePedido {
    id: number;
    precio: number;
    cantidad: number;
    producto: Producto;
  }
  
  export interface IPedidoVendedor {
    id: number;
    fecha: string;
    hora: string;
    estatus: Estado;
    tienda: Tienda;
    cliente: Cliente;
    detallesPedido: DetallePedido[];
  }
  
  // Uso del interface con el ejemplo proporcionado

  