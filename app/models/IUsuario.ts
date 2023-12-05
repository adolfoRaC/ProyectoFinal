interface IUsuario {
    id: number;
    nombre: string;
    apepat: string;
    apemat: string;
    correo_Electronico: string;
    telefono: string;
    usuario: string;
    rol: {
      id: number;
      rol: string;
    };
  }
  
  export default IUsuario;
  