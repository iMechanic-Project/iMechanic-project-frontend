import { MecanicoDTOList } from "./MecanicoDTOList";
import { OperationDTOResponse } from "./ServicioDTO";
import { StepOrderResponse } from "./StepOrderResponse";

export interface OperationDetailsDTOResponse {
    operation: OperationDTOResponse;
    mechanic: MecanicoDTOList;
    statusOperation: string;
    steps: StepOrderResponse[];
}