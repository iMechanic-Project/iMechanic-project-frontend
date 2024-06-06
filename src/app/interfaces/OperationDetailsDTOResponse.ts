import { MecanicoDTOList } from "./MecanicoDTOList";
import { PasoDTO } from "./PasoDTO";
import { OperationDTOResponse } from "./ServicioDTO";

export interface OperationDetailsDTOResponse {
    operation: OperationDTOResponse;
    mechanic: MecanicoDTOList;
    statusOperation: string;
    steps: PasoDTO[];
}