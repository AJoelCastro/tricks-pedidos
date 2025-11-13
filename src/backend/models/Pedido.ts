import mongoose, { Schema } from "mongoose";
import { IPedido } from "../interfaces/Pedido";

const PedidoSchema = new Schema<IPedido>({
    cliente: { type: String, required: true },
    celular: { type: String, required: true },
    dni: { type: String, required: true },
    ciudad: { type: String, required: true },
    modelo: { type: String, required: true },
    talla: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    fechaEntrega: { type: Date, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    estado: { type: String, required: true },
    total: { type: Number, required: true },
    pago: { type: String, required: true },
    esBoleta: { type: Boolean },
    esFactura: { type: Boolean },
})

export const PedidoModel = mongoose.model<IPedido>('Pedido', PedidoSchema);