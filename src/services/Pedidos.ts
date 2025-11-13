import { IPedidoRequest } from "@/backend/interfaces/Pedido";
import { formatAxiosError } from "@/lib/FormatAxiosError";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND

const PedidoService = {
    createPedido: async (pedidoData: IPedidoRequest, token: string) => {
        try {
            const response = await axios.post(`${API_URL}/pedidos`, pedidoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(formatAxiosError(error as Error));
        }
    },
    getPedidoById: async (id: string, token: string) => {
        try {
            const response = await axios.get(`${API_URL}/pedidos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(formatAxiosError(error as Error));
        }
    },
    updatePedido: async (id: string, pedidoData: IPedidoRequest, token: string) => {
        try {
            const response = await axios.put(`${API_URL}/pedidos/${id}`, pedidoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(formatAxiosError(error as Error));
        }
    },
    deletePedido: async (id: string, token: string) => {
        try {
            const response = await axios.delete(`${API_URL}/pedidos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(formatAxiosError(error as Error));
        }
    },
    getAllPedidos: async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/pedidos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(formatAxiosError(error as Error));
        }
    },
};
export default PedidoService;