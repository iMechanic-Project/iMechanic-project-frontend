import { ServicioDetalleDTO } from "./ServicioDetalleDTO";

export interface OrderDetailDTO {
    id: number;
    nombreTaller: string;
    direccionTaller: string;
    telefonoTaller: string;
    servicios: ServicioDetalleDTO[];
}