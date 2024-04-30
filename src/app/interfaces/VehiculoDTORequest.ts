import { Categoria } from "./Categoria";

export interface VehiculoDTORequest {
    placa: string;
    marcaId: number
    modeloId: number;
    categoria: Categoria;
}