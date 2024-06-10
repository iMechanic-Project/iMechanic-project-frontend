import { MecanicoDTOList } from "./MecanicoDTOList";
import { OperationDTOResponse } from "./ServicioDTO";
import { StepOrderResponse } from "./StepOrderResponse";

export interface OrderDetailMecanicoDTO {
    id: string,
    name: string;
    address: string;
    phoneWorkshop: string;
    operation: OperationDTOResponse;
    statusOperation: string;
    mechanic: MecanicoDTOList;
    phoneMechanic: string;
    steps: StepOrderResponse[];
}