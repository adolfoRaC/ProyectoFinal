interface IMunicipio {
    id: number;
    municipio: string;
    idEstado: number;
  }
  
  interface IEstado {
    id: number;
    estado: string;
  }
  
  interface IDireccion {
    id: number;
    calle: string;
    numero: number;
    colonia: string;
    CP: number;
    municipio: IMunicipio;
    estado: IEstado;
  }
  
  interface IPropietario {
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
  
  interface ITienda {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    propietario: IPropietario;
    direccion: IDireccion;
  }
  
  export default ITienda;
  