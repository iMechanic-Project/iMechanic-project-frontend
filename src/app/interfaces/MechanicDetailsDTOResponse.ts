import { OperationDTOResponse } from "./ServicioDTO";

export interface MechanicDetailsDTOResponse {
    name: string;
    phone: string;
    email: string;
    operations: OperationDTOResponse[];
}