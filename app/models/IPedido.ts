export interface idPedido {

    pedido: {
        id: 0,
        fecha: null,
        hora: null,
        idEstatus: 0,
        idCliente: 0
    },
    detallesPedido: [
        {
            id: 0,
            precio: 0,
            cantidad: 0,
            idProducto: 0,
            idPedido: null,
        }
    ]

}