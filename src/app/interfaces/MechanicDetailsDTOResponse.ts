import { OperationDTOResponse } from "./ServicioDTO";

export interface MechanicDetailsDTOResponse {
    name: string;
    password: string;
    email: string;
    operations: OperationDTOResponse[];
}