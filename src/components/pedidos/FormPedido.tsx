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
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <div>
        <label className="block text-sm">Cliente</label>
        <input className="w-full border p-2" {...register("cliente", { required: true })} />
      </div>
      <div>
        <label className="block text-sm">Celular</label>
        <input className="w-full border p-2" {...register("celular")} />
      </div>
      <div>
        <label className="block text-sm">DNI</label>
        <input className="w-full border p-2" {...register("dni")} />
      </div>
      <div>
        <label className="block text-sm">Ciudad</label>
        <input className="w-full border p-2" {...register("ciudad")} />
      </div>
      <div>
        <label className="block text-sm">Modelo</label>
        <input className="w-full border p-2" {...register("modelo")} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm">Talla</label>
          <input type="number" className="w-full border p-2" {...register("talla", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="block text-sm">Cantidad</label>
          <input type="number" className="w-full border p-2" {...register("cantidad", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="block text-sm">Total</label>
          <input type="number" step="0.01" className="w-full border p-2" {...register("total", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Estado</label>
          <select className="w-full border p-2" {...register("estado")}>
            <option value="pendiente">pendiente</option>
            <option value="en proceso">en proceso</option>
            <option value="completado">completado</option>
            <option value="cancelado">cancelado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Pago</label>
          <select className="w-full border p-2" {...register("pago")}>
            <option value="pendiente">pendiente</option>
            <option value="completado">completado</option>
            <option value="fallido">fallido</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("esBoleta")} /> Es boleta
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("esFactura")} /> Es factura
        </label>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
        )}
      </div>
    </form>
  );
}
