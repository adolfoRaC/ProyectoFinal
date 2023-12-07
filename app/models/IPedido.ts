export interface IPedido {

    pedido: {
        id: number,
        fecha: string,
        hora: string,
        idEstatus: number,
        idTienda: number
        idCliente: number
    },
    detallesPedido: [
        {
            id: number,
            precio: number,
            cantidad: number,
            idProducto: number,
            idPedido: number,
        }
    ]

}