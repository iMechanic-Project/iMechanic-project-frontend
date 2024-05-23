import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { ServicioDTO } from "./ServicioDTO";

export interface OrderDetailMecanicoDTO {
    id: number,
    nombre: string;
    direccion: string;
    telefonoTaller: string;
    servicio: ServicioDTO;
    estadoServicio: string;
    mecanico: MecanicoDTOList;
    telefonoMecanico: string;
    pasos: PasoDTO[];
}