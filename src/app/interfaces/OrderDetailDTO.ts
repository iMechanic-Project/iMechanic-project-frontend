import { ServicioDetalleDTO } from "./ServicioDetalleDTO";

export interface OrderDetailDTO {
    nombreTaller: string;
    direccionTaller: string;
    telefonoTaller: string;
    servicios: ServicioDetalleDTO[];
}