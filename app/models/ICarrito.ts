import { IProducto } from "./IProducto";

export interface ICarrito{
    id?: string;
    idUsuario: number;
    idTienda: number;
    idProducto: number;
    cantidad: number;
    productDetails?: IProducto;
}