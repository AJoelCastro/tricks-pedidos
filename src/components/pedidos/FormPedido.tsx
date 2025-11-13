"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { IPedidoRequest } from "@/backend/interfaces/Pedido";

type Props = {
  initialValues?: Partial<IPedidoRequest>;
  onSubmit: (data: IPedidoRequest) => Promise<void> | void;
  onCancel?: () => void;
};

export default function FormPedido({ initialValues, onSubmit, onCancel }: Props) {
  const { register, handleSubmit, reset } = useForm<IPedidoRequest>({
    defaultValues: {
      cliente: initialValues?.cliente ?? "",
      celular: initialValues?.celular ?? "",
      dni: initialValues?.dni ?? "",
      ciudad: initialValues?.ciudad ?? "",
      modelo: initialValues?.modelo ?? "",
      talla: initialValues?.talla ?? 0,
      cantidad: initialValues?.cantidad ?? 1,
      fechaEntrega: (initialValues?.fechaEntrega ?? new Date()),
      fechaRegistro: (initialValues?.fechaRegistro ?? new Date()),
      estado: (initialValues?.estado ) ?? "pendiente",
      total: initialValues?.total ?? 0,
      pago: (initialValues?.pago) ?? "pendiente",
      esBoleta: initialValues?.esBoleta ?? false,
      esFactura: initialValues?.esFactura ?? false,
    },
  });

  const submit = async (data: IPedidoRequest) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Cliente *</label>
          <input className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Nombre del cliente" {...register("cliente", { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">DNI</label>
          <input className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="DNI" {...register("dni")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Celular</label>
          <input className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="+51 999 999 999" {...register("celular")} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Ciudad</label>
          <input className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Ciudad" {...register("ciudad")} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Modelo</label>
        <input className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Modelo de prenda" {...register("modelo")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Talla</label>
          <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" {...register("talla", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Cantidad</label>
          <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" {...register("cantidad", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Total (S/)</label>
          <input type="number" step="0.01" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" {...register("total", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Estado</label>
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" {...register("estado")}>
            <option value="pendiente">Pendiente</option>
            <option value="en proceso">En proceso</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pago</label>
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" {...register("pago")}>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            <option value="fallido">Fallido</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" {...register("esBoleta")} />
          <span className="font-semibold text-slate-700">Es boleta</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" {...register("esFactura")} />
          <span className="font-semibold text-slate-700">Es factura</span>
        </label>
      </div>

      <div className="flex gap-3 pt-6">
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
          Guardar Pedido
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
