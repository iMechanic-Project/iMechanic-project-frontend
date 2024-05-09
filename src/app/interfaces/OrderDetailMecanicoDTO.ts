import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { ServicioDTO } from "./ServicioDTO";

export interface OrderDetailMecanicoDTO {
    id: number,
    nombre: string;
    direccion: string;
    telefono: string;
    servicio: ServicioDTO;
    estadoServicio: string;
    mecanico: MecanicoDTOList;
    pasos: PasoDTO[];
}