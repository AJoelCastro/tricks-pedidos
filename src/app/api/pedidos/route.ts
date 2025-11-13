import { IPedidoRequest } from "@/backend/interfaces/Pedido";
import { connectDB } from "@/backend/lib/mongodb";
import { PedidoRepository } from "@/backend/repository/Pedido";
import { NextResponse } from "next/server";

const pedidoRepository = new PedidoRepository();

export async function GET() {
    try {
        await connectDB();
        const pedidos = await pedidoRepository.findAll();
        return NextResponse.json(pedidos, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving pedidos", error }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        await connectDB();
        const data: IPedidoRequest = await request.json();
        const newPedido = await pedidoRepository.create(data);
        return NextResponse.json(newPedido, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating pedido", error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const {id, data}: {id: string, data: IPedidoRequest} = await request.json();
        const updatedPedido = await pedidoRepository.update(id,data);
        return NextResponse.json(updatedPedido, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating pedido", error }, { status: 500 });
    }
}
export async function DELETE(request: Request) {
    try {
        await connectDB();
        const {id}: {id: string} = await request.json();
        const deletedPedido = await pedidoRepository.delete(id);
        return NextResponse.json(deletedPedido, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting pedido", error }, { status: 500 });
    }
}

