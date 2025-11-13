import { connectDB } from "@/backend/lib/mongodb";
import { PedidoRepository } from "@/backend/repository/Pedido";
import { NextResponse } from "next/server";

const pedidoRepository = new PedidoRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const pedido = await pedidoRepository.findById(params.id);

    if (!pedido) {
      return NextResponse.json(
        { message: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener el pedido", error },
      { status: 500 }
    );
  }
}
