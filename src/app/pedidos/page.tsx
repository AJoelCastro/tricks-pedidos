"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { IPedido, IPedidoRequest } from "@/backend/interfaces/Pedido";
import FormPedido from "@/components/pedidos/FormPedido";
import PedidoService from "@/services/Pedidos";
import { useAuth } from "@clerk/nextjs";

type Pedido = IPedido & { _id?: string };

export default function PedidosPage() {
    const { isSignedIn, isLoaded } = useUser();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<Pedido | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { getToken } = useAuth();
    const loadPedidos = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const data = await PedidoService.getAllPedidos(token as string);
            setPedidos(data);
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
            const res = await PedidoService.deletePedido(id, await getToken() as string);
            if (res.message === "Deleted") {
                await loadPedidos();
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Mis Pedidos</h1>
                    <button onClick={handleCreate} className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                        + Nuevo Pedido
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {editing ? "Editar Pedido" : "Crear Nuevo Pedido"}
                                </h2>
                                <button
                                    onClick={() => { setShowForm(false); setEditing(null); }}
                                    className="text-slate-400 hover:text-slate-600 text-2xl font-light"
                                >
                                    ✕
                                </button>
                            </div>
                            <FormPedido initialValues={editing ? (editing as unknown as Partial<IPedidoRequest>) : undefined} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditing(null); }} />
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-slate-600 font-medium">Cargando pedidos...</p>
                        </div>
                    </div>
                )}

                {/* Pedidos Grid */}
                {!loading && (
                    <div className="space-y-4">
                        {pedidos.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">Sin pedidos</h3>
                                <p className="text-slate-600 mb-6">Crea tu primer pedido para comenzar.</p>
                                <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                                    Crear Pedido
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {pedidos.map((p, idx) => (
                                    <div key={p._id ?? idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold text-slate-900">{p.cliente}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        p.estado === 'completado' ? 'bg-green-100 text-green-800' :
                                                        p.estado === 'en proceso' ? 'bg-blue-100 text-blue-800' :
                                                        p.estado === 'cancelado' ? 'bg-red-100 text-red-800' :
                                                        'bg-amber-100 text-amber-800'
                                                    }`}>
                                                        {p.estado}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600">{p.modelo}</p>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-sm">
                                                    <div>
                                                        <span className="text-slate-500">Cantidad:</span>
                                                        <p className="font-semibold text-slate-900">{p.cantidad} x Talla {p.talla}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Total:</span>
                                                        <p className="font-semibold text-slate-900">S/ {p.total.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Pago:</span>
                                                        <p className={`font-semibold ${p.pago === 'completado' ? 'text-green-600' : p.pago === 'fallido' ? 'text-red-600' : 'text-amber-600'}`}>
                                                            {p.pago}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Ciudad:</span>
                                                        <p className="font-semibold text-slate-900">{p.ciudad}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 lg:flex-col lg:gap-3">
                                                <button onClick={() => handleEdit(p)} className="flex-1 lg:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">
                                                    ✏️ Editar
                                                </button>
                                                <button onClick={() => handleDelete(p._id)} className="flex-1 lg:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
