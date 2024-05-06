import { PasoDTO } from "./PasoDTO";

export interface OrderDetailMecanicoDTO {
    nombre: string;
    direccion: string;
    telefono: string;
    servicio: string;
    estadoServicio: string;
    nombreMecanico: string;
    pasos: PasoDTO[];
}