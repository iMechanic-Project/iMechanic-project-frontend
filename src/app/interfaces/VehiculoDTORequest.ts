import { Categoria } from "./Categoria";

export interface VehiculoDTORequest {
    plate: string;
    brandId: number
    modelId: number;
    category: Categoria;
}