import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { OperationDTOResponse } from "./ServicioDTO";

export interface OrderDetailMecanicoDTO {
    id: string,
    nombre: string;
    direccion: string;
    telefonoTaller: string;
    operation: OperationDTOResponse;
    estadoServicio: string;
    mecanico: MecanicoDTOList;
    telefonoMecanico: string;
    pasos: PasoDTO[];
}