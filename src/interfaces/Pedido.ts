import { Document } from "mongoose";

export interface IPedidoRequest {
    cliente: string;
    celular: string;
    dni: string;
    ciudad: string;
    modelo: string;
    talla: number;
    cantidad: number;
    fechaEntrega: Date;
    fechaRegistro: Date;
    estado: 'pendiente' | 'en proceso' | 'completado' | 'cancelado';
    total: number;
    pago: 'pendiente' | 'completado' | 'fallido';
    esBoleta?: boolean;
    esFactura?: boolean;
}

export interface IPedido extends Document {
    cliente: string;
    celular: string;
    dni: string;
    ciudad: string;
    modelo: string;
    talla: number;
    cantidad: number;
    fechaEntrega: Date;
    fechaRegistro: Date;
    estado: 'pendiente' | 'en proceso' | 'completado' | 'cancelado';
    total: number;
    pago: 'pendiente' | 'completado' | 'fallido';
    esBoleta: boolean;
    esFactura: boolean;
}