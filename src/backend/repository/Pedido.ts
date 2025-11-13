import { IPedidoRequest } from "../interfaces/Pedido";
import { PedidoModel } from "../models/Pedido";

export class PedidoRepository {
    async create(data: IPedidoRequest){
        return await PedidoModel.create(data);
    }

    async findAll(){
        return await PedidoModel.find().exec();
    }

    async findById(id: string){
        return await PedidoModel.findById(id).exec();
    }

    async update(id: string, data: Partial<IPedidoRequest>){
        return await PedidoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    
    async delete(id: string){
        return await PedidoModel.findByIdAndDelete(id).exec();
    }
}