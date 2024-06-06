import { OperationDetailsDTOResponse } from "./OperationDetailsDTOResponse";

export interface OrderDetailDTO {
    id: string;
    nameWorkshop: string;
    addressWorkshop: string;
    phoneWorkShop: string;
    operationDetails: OperationDetailsDTOResponse[];
}