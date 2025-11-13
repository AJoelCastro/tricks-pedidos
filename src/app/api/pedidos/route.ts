import { IPedidoRequest } from "@/backend/interfaces/Pedido";
import { connectDB } from "@/lib/mongodb";
import { PedidoRepository } from "@/backend/repository/Pedido";
import { NextResponse, NextRequest } from "next/server";

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

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data: IPedidoRequest = await req.json();
        const newPedido = await pedidoRepository.create(data);
        return NextResponse.json(newPedido, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating pedido", error }, { status: 500 });
    }
}




