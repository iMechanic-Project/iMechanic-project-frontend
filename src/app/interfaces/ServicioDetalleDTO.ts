import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { ServicioDTO } from "./ServicioDTO";

export interface ServicioDetalleDTO {
    servicio: ServicioDTO;
    mecanico: MecanicoDTOList;
    estadoServicio: string;
    pasos: PasoDTO[];
}