import { IPedidoRequest } from "../interfaces/Pedido";
import { PedidoModel } from "../models/Pedido";

export class PedidoRepository {
    async create(data: IPedidoRequest){
        try {
            return await PedidoModel.create(data);
        } catch (error) {
            throw new Error(`Error creating Pedido: ${error}`);
        }
    }
    async findAll(){
        try {
            return await PedidoModel.find().exec();
        } catch (error) {
            throw new Error(`Error finding Pedidos: ${error}`);
        }
    }
    async findById(id: string){
        try {
            return await PedidoModel.findById(id).exec();
        } catch (error) {
            throw new Error(`Error finding Pedido by ID: ${error}`);
        }
    }
    async update(id: string, data: Partial<IPedidoRequest>){
        try {
            return await PedidoModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            throw new Error(`Error updating Pedido: ${error}`);
        }
    }
    async delete(id: string){
        try {
            return await PedidoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error(`Error deleting Pedido: ${error}`);
        }
    }
}