import { connectDB } from "@/lib/mongodb";
import { PedidoRepository } from "@/backend/repository/Pedido";
import { NextResponse, NextRequest } from "next/server";

const pedidoRepository = new PedidoRepository();

export async function GET(
  request: NextRequest,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    await connectDB();
    const deleted = await pedidoRepository.delete(params.id);
    if (!deleted) return NextResponse.json({ message: "Pedido not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting pedido", error }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
   
    await connectDB();
    const data = await request.json();
    const updated = await pedidoRepository.update(params.id, data);
    if (!updated) return NextResponse.json({ message: "Pedido not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating pedido", error }, { status: 500 });
  }
}
