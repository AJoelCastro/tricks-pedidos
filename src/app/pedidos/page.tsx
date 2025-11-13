"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { IPedido } from "@/backend/interfaces/Pedido";
import PedidoService from "@/services/Pedidos";

type Pedido = IPedido;

export default function PedidosPage() {
    const { isSignedIn } = useUser();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    const loadPedidos = async () => {
        try {
            const data = await PedidoService.getAllPedidos();
            setPedidos(data);
        } catch (error) {
            console.error("Error loading pedidos:", error);
        }
    }
    useEffect(() => {
        if (!isSignedIn) return;

        // Run loader asynchronously to avoid calling setState synchronously inside the effect
        (async () => {
            try {
                await loadPedidos();
            } catch (error) {
                console.error("Error loading pedidos from effect:", error);
            }
        })();
    }, [isSignedIn]);


    if (!isSignedIn) {
        return <div className="p-8">Por favor inicia sesión para ver tus pedidos.</div>;
    }

    return (
        <></>
    );
}
