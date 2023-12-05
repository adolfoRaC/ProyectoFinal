interface IUsuario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
    telefono: string;
    rol: {
      id: number;
      rol: string;
    };
  }
  
  export default IUsuario;
  