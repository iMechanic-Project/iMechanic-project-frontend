import { ServicioDTO } from "./ServicioDTO";

export interface MechanicDTO {
    nombre: string;
    correoElectronico: string;
    servicios: ServicioDTO[];
}