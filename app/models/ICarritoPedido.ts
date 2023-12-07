import { IProducto } from "./IProducto";
import ITienda from "./ITienda";

export interface ICarritoPedido{
    id?: string;
    idUsuario: number;
    idTienda: number;
    idProducto: number;
    cantidad: number;
    productDetails?: IProducto;
    tiendaDetails?: ITienda;
}