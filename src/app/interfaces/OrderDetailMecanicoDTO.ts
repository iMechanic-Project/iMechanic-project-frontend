import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { OperationDTOResponse } from "./ServicioDTO";

export interface OrderDetailMecanicoDTO {
    id: string,
    name: string;
    address: string;
    phoneWorkshop: string;
    operation: OperationDTOResponse;
    statusOperation: string;
    mechanic: MecanicoDTOList;
    phoneMechanic: string;
    steps: PasoDTO[];
}