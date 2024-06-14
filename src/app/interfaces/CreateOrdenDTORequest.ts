import { ServicioMecanicoDTO } from "./ServicioMecanicoDTO";

export interface CreateOrdenDTORequest {
    emailCustomer: string;
    plate: string;
    assignmentDTORequests: ServicioMecanicoDTO[];
}