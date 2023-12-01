interface IUsuario {
    id: number;
    nombre: string;
    apepat: string;
    apemat: string;
    correo_Electronico: string;
    telefono: string;
    rol: {
      id: number;
      rol: string;
    };
  }
  
  export default IUsuario;
  