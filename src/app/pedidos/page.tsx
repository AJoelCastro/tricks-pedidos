"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { IPedido, IPedidoRequest } from "@/backend/interfaces/Pedido";
import FormPedido from "@/components/pedidos/FormPedido";

type Pedido = IPedido & { _id?: string };

export default function PedidosPage() {
    const { isSignedIn, isLoaded } = useUser();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<Pedido | null>(null);
    const [showForm, setShowForm] = useState(false);

    const loadPedidos = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/pedidos");
            if (res.ok) {
                const data = await res.json();
                setPedidos(data);
            } else if (res.status === 401) {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error loading pedidos:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;
        loadPedidos();
    }, [isSignedIn, isLoaded]);

    const handleCreate = () => {
        setEditing(null);
        setShowForm(true);
    }

    const handleEdit = (p: Pedido) => {
        setEditing(p);
        setShowForm(true);
    }

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("¿Eliminar este pedido?")) return;
        try {
            const res = await fetch(`/api/pedidos/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                await loadPedidos();
            } else if (res.status === 401) {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error deleting pedido:", error);
        }
    }

    const handleSubmit = async (data: IPedidoRequest) => {
        try {
            if (editing && editing._id) {
                const res = await fetch(`/api/pedidos/${editing._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    setShowForm(false);
                    setEditing(null);
                    await loadPedidos();
                } else if (res.status === 401) {
                    window.location.href = "/";
                }
            } else {
                const res = await fetch("/api/pedidos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    setShowForm(false);
                    setEditing(null);
                    await loadPedidos();
                } else if (res.status === 401) {
                    window.location.href = "/";
                }
            }
        } catch (error) {
            console.error("Error saving pedido:", error);
        }
    }

    if (!isLoaded) {
        return <div className="p-8">Cargando...</div>;
    }

    if (!isSignedIn) {
        return <div className="p-8">Por favor inicia sesión para ver tus pedidos.</div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Pedidos</h1>
                <div>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded">Nuevo pedido</button>
                </div>
            </div>

            {showForm && (
                <div className="mb-6 p-4 border rounded bg-white">
                    <FormPedido initialValues={editing ? (editing as unknown as Partial<IPedidoRequest>) : undefined} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditing(null); }} />
                </div>
            )}

            {loading ? (
                <div>Cargando...</div>
            ) : (
                <ul className="space-y-3">
                    {pedidos.map((p, idx) => (
                        <li key={p._id ?? idx} className="border p-3 rounded flex justify-between items-center">
                            <div>
                                <div className="font-medium">{p.cliente} — {p.modelo}</div>
                                <div className="text-sm text-zinc-600">{p.cantidad} x {p.talla} — S/ {p.total}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
                                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
