import { PasoDTO } from "./PasoDTO";

export interface ServicioDetalleDTO {
    nombreServicio: string;
    nombreMecanico: string;
    estadoServicio: string;
    pasos: PasoDTO[];
}