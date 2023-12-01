import { ICategoria } from "./ICategorias";
import { IImagenProducto } from "./IImagen";

export interface IProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    visualizacion: boolean;
    categoria: ICategoria;
    imagenes: IImagenProducto[];
    likes: number;
    visitas: number;
    evaluacion: number;
}